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
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "jiajuan7187@gmail.com",
pass: "yvtdlxygrzmueobn",
},
});
await transporter.sendMail({
from: "吳家農場",
to: "jiajuan7187@gmail.com",
subject: `新訂單 - ${name}`,
text: `${name} (${phone}) 下單\n` + cart.map(p => `${p.name} - $${p.price}`).join("\n")
});
res.json({ success: true });
});
app.listen(3001, () => console.log("Server running on http://localhost:3001"));