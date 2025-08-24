const express = require("express");
const router = express.Router();
const sendMail = require("../utils/sendMail");
const { body, validationResult } = require("express-validator");

// Validation rules
const contactValidation = [
  body("sellerEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid seller email is required"),
  body("buyerEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid buyer email is required"),
  body("productTitle")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Product title is required (max 200 characters)"),
  body("sellerName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Seller name too long"),
];

router.post("/contact-buyer", contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      sellerEmail,
      buyerEmail,
      productTitle,
      sellerName = "CampusKart Seller",
    } = req.body;

    // Prevent email bombing/spam
    if (sellerEmail === buyerEmail) {
      return res.status(400).json({
        message: "Seller and buyer emails cannot be the same",
      });
    }

    // Create email content
    const subject = `Regarding your interest in: ${productTitle}`;

    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CampusKart Connection</h1>
          </div>
          <div class="content">
            <h2>Hello there,</h2>
            <p>You're receiving this message because you expressed interest in <strong>${productTitle}</strong> on CampusKart.</p>
            
            <p><strong>${sellerName}</strong>, the seller of this item, would like to connect with you.</p>
            
            <p>You can contact them directly at:</p>
            <p style="text-align: center; margin: 25px 0;">
              <a href="mailto:${sellerEmail}" class="button">Email ${sellerName}</a>
            </p>
            
            <p>Or simply reply to this email and it will be forwarded to the seller.</p>
            
            <div class="footer">
              <p>This message was sent through CampusKart to protect both buyer and seller privacy.</p>
              <p>Please do not reply to this automated message. Use the contact information provided above.</p>
              <p>© ${new Date().getFullYear()} CampusKart. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const textVersion = `
Hello,

You're receiving this message because you expressed interest in "${productTitle}" on CampusKart.

${sellerName}, the seller of this item, would like to connect with you.

You can contact them directly at: ${sellerEmail}

Or simply reply to this email and it will be forwarded to the seller.

This message was sent through CampusKart to protect both buyer and seller privacy.

Please do not reply to this automated message. Use the contact information provided above.

© ${new Date().getFullYear()} CampusKart. All rights reserved.
    `;

    // Send email with improved function
    const result = await sendMail({
      sellerEmail,
      buyerEmail,
      subject,
      message: htmlMessage,
      sellerName,
      textVersion,
    });

    if (result.success) {
      console.log(
        `Contact email sent from ${sellerEmail} to ${buyerEmail} about ${productTitle}`
      );

      res.json({
        message: "Email sent successfully",
        details: {
          to: buyerEmail,
          subject,
          timestamp: new Date().toISOString(),
          messageId: result.messageId,
        },
      });
    } else {
      console.error("Email sending failed:", result.error);

      // Provide appropriate status code based on error type
      const statusCode = result.errorType === "invalid_email" ? 400 : 500;

      res.status(statusCode).json({
        message: "Failed to send email",
        error: result.errorType,
        details:
          process.env.NODE_ENV === "development" ? result.error : undefined,
      });
    }
  } catch (error) {
    console.error("Unexpected error in contact-buyer:", error);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
