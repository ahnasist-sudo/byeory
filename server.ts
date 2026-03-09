import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS seo (
    page TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    keywords TEXT
  );
`);

// Seed initial settings if empty
const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const insertSetting = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  insertSetting.run("site_name", "사회적협동조합 벼리");
  insertSetting.run("primary_color", "#FACC15"); // Yellow-400
  insertSetting.run("bg_color", "#000000");
  insertSetting.run("about_text", "사회적협동조합 벼리는 지역사회의 복지 증진과 소외계층 지원을 위해 설립된 사회적협동조합입니다.");
} else {
  // Update existing about_text if it has the old value
  const currentAbout = db.prepare("SELECT value FROM settings WHERE key = 'about_text'").get() as { value: string };
  if (currentAbout && currentAbout.value.includes("사회복지법인")) {
    db.prepare("UPDATE settings SET value = ? WHERE key = 'about_text'").run(
      currentAbout.value.replace("사회복지법인", "사회적협동조합")
    );
  }
}

// Seed initial posts if empty
const postsCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postsCount.count === 0) {
  const insertPost = db.prepare("INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)");
  insertPost.run("2024년 정기 총회 안내", "올해 정기 총회가 4월 15일에 개최됩니다. 많은 참여 부탁드립니다.", "공지사항", "https://picsum.photos/seed/meeting/800/400");
  insertPost.run("지역 어르신 도시락 배달 봉사", "지난 주말, 단원들과 함께 지역 어르신들께 따뜻한 도시락을 전달했습니다.", "활동내역", "https://picsum.photos/seed/volunteer/800/400");
  insertPost.run("신규 회원 모집 안내", "벼리와 함께할 새로운 가족을 찾습니다. 사회복지에 관심 있는 분들의 많은 지원 바랍니다.", "새소식", "https://picsum.photos/seed/join/800/400");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.json(posts);
  });

  app.post("/api/posts", (req, res) => {
    const { title, content, category, image_url } = req.body;
    const info = db.prepare("INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)").run(title, content, category, image_url);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/posts/:id", (req, res) => {
    const { title, content, category, image_url } = req.body;
    db.prepare("UPDATE posts SET title = ?, content = ?, category = ?, image_url = ? WHERE id = ?").run(title, content, category, image_url, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/posts/:id", (req, res) => {
    db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = (settings as { key: string; value: string }[]).reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
    res.json(settingsMap);
  });

  app.post("/api/settings", (req, res) => {
    const updates = req.body;
    const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        upsert.run(key, value);
      }
    });
    transaction(updates);
    res.json({ success: true });
  });

  app.get("/api/seo", (req, res) => {
    const seo = db.prepare("SELECT * FROM seo").all();
    res.json(seo);
  });

  app.post("/api/seo", (req, res) => {
    const { page, title, description, keywords } = req.body;
    db.prepare("INSERT OR REPLACE INTO seo (page, title, description, keywords) VALUES (?, ?, ?, ?)").run(page, title, description, keywords);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
