const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({
  sellerEmail,
  buyerEmail,
  subject,
  message,
  sellerName = "CampusKart Seller",
  textVersion = null,
}) => {
  try {
    // Validate required parameters
    if (!sellerEmail || !buyerEmail || !subject || !message) {
      throw new Error("Missing required email parameters");
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sellerEmail) || !emailRegex.test(buyerEmail)) {
      throw new Error("Invalid email format");
    }

    // Rate limiting check (simple in-memory implementation)
    // In production, consider using Redis or similar for rate limiting
    const now = Date.now();
    const lastEmailSent = global.lastEmailSent || 0;
    if (now - lastEmailSent < 1000) {
      // 1 second between emails
      console.warn("Email rate limiting triggered");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    global.lastEmailSent = Date.now();

    // Create transporter with improved configuration
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASS,
      },
      pool: true, // Use pooled connections
      maxConnections: 5, // Maximum simultaneous connections
      maxMessages: 100, // Maximum messages per connection
      rateLimit: 5, // Maximum messages per second
      // Better timeout settings
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 30000, // 30 seconds
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("Email server connection verified");

    // Prepare email options
    const mailOptions = {
      from: {
        name: sellerName,
        address: process.env.APP_EMAIL,
      },
      to: buyerEmail,
      subject: subject,
      html: message,
      text: textVersion || stripHtml(message), // Provide text alternative
      replyTo: {
        name: sellerName,
        address: sellerEmail,
      },
      // Add headers for better email deliverability
      headers: {
        "X-Priority": "3", // Normal priority
        "X-Mailer": "CampusKart Marketplace",
        "List-Unsubscribe": `<mailto:${process.env.SUPPORT_EMAIL}?subject=Unsubscribe>`,
      },
      // DKIM signing would be configured at transporter level in production
    };

    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timeout")), 30000);
    });

    const result = await Promise.race([sendPromise, timeoutPromise]);

    console.log("Email sent successfully to:", buyerEmail);
    return {
      success: true,
      messageId: result.messageId,
      envelope: result.envelope,
    };
  } catch (err) {
    console.error("Error sending email:", err.message);

    // Categorize errors for better client handling
    let errorType = "unknown_error";
    if (err.message.includes("timeout")) errorType = "timeout";
    if (err.message.includes("authentication")) errorType = "auth_failed";
    if (err.message.includes("rate")) errorType = "rate_limit";
    if (err.message.includes("Invalid email")) errorType = "invalid_email";

    return {
      success: false,
      error: err.message,
      errorType,
      // Don't expose sensitive info in production
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };
  }
};

// Helper function to create text version from HTML
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
    .replace(/&amp;/g, "&") // Decode HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Optional: Add method to close transporter pool
process.on("SIGINT", async () => {
  if (global.emailTransporter) {
    await global.emailTransporter.close();
    console.log("Email transporter closed");
  }
  process.exit(0);
});

module.exports = sendMail;
