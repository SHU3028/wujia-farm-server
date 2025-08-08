const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/order", async (req, res) => {
  const { name, phone, cart } = req.body;
  console.log("[order]", name, phone, cart);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "吳家農場",
      to: process.env.GMAIL_USER,
      subject: `新訂單 - ${name}`,
      text: `${name} (${phone}) 下單\n` +
        cart.map(p => `${p.name} - $${p.price}`).join("\n")
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "發送失敗" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
