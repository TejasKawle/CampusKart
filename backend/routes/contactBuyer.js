const express = require("express");
const router = express.Router();
const sendMail = require("../utils/sendMail");

router.post("/contact-buyer", async (req, res) => {
  const { sellerEmail, buyerEmail, productTitle } = req.body;

  if (!sellerEmail || !buyerEmail)
    return res
      .status(400)
      .json({ message: "Seller and buyer emails required" });

  const subject = `Regarding your purchase of ${productTitle}`;
  const message = `<p>Hello! I am the seller of <strong>${productTitle}</strong>.</p>
                   <p>Contact me at: <a href="mailto:${sellerEmail}">${sellerEmail}</a></p>`;

  const result = await sendMail({ sellerEmail, buyerEmail, subject, message });

  if (result.success) {
    res.json({ message: "Email sent successfully" });
  } else {
    res.status(500).json({ message: result.error });
  }
});

module.exports = router;
