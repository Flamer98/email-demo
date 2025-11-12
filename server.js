import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// (optional) if you ever send form posts:
app.use(express.urlencoded({ extended: true }));

// serve the front end
app.use(express.static(path.join(__dirname, "public")));

// Health check route for Render (TOP-LEVEL, not inside another handler)
app.get("/health", (_, res) => res.status(200).send("ok"));

// POST /send -> sends an email
app.post("/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // or smtp.mailtrap.io
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Fruit Bot" <no-reply@fruitapp.test>',
      to,
      subject,
      text,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

// IMPORTANT: bind to Render's PORT and 0.0.0.0
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
