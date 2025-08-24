const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ sellerEmail, buyerEmail, subject, message }) => {
  try {
    // Create transporter using your app email credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email service
      auth: {
        user: process.env.APP_EMAIL, // your app email
        pass: process.env.APP_EMAIL_PASS, // app email password or app password
      },
    });

    await transporter.sendMail({
      from: `"CampusKart Seller" <${process.env.APP_EMAIL}>`, // sender is your app
      to: buyerEmail, // receiver
      subject,
      html: message,
      replyTo: sellerEmail, // replies go to seller
    });

    console.log("Email sent successfully!");
    return { success: true };
  } catch (err) {
    console.error("Error sending email:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = sendMail;
