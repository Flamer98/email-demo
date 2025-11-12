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

//serve the front end
app.use(express.static(path.join(__dirname, "public")));

// Post /send -> sends an email

app.post("/send", async (req, res) => {
    try {
        const {to, subject, text} = req.body;

        const transporter = nodemailer.createTransport({

            host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        await transporter.sendMail({
            from: '"Fruit Bot" <no-reply@fruitapp.test>',
            to,  // email for test
            subject, // You clicked apple
            text, // plain text body
        });

        res.json({ ok: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, error: "Failed to send email"});

    }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
