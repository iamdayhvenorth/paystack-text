// routes/webhook.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const app = express();
app.post("/paystack", express.raw({ type: "application/json" }), (req, res) => {
  const secret = "sk_test_b10a33bcb8c4cd07838750eea59ee32cc57cf68b";

  const hash = crypto
    .createHmac("sha512", secret)
    .update(req.body)
    .digest("hex");

  console.log("Hashed here ", hash);

  if (hash === req.headers["x-paystack-signature"]) {
    const event = JSON.parse(req.body); // now it's safe to parse
    console.log("Eventt here ", event);
    // Handle the event
    if (event.event === "charge.success") {
      const paymentInfo = event.data;
      // ✅ Update order/payment/wallet etc. in your DB here
    }

    return res.sendStatus(200);
  } else {
    return res.sendStatus(401); // Unauthorized
  }
});

app.listen(8000, () => {
  console.log("app is running on port 8000");
});

module.exports = router;
