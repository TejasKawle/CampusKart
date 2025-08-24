require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoute");
const contactBuyerRoute = require("./routes/contactBuyer");

// Import Order model
const Order = require("./models/Order");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", contactBuyerRoute);

// Serve frontend
const frontendPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ---------------------- SSE NOTIFICATIONS ----------------------
const clients = new Map(); // Map<userId, res>

// SSE endpoint
app.get("/api/notifications/stream/:userId", (req, res) => {
  const { userId } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write("\n");

  clients.set(userId, res);
  console.log(`SSE client connected: ${userId}`);

  req.on("close", () => {
    clients.delete(userId);
    console.log(`SSE client disconnected: ${userId}`);
  });
});

// Function to send notification to a specific user
const sendNotification = (userId, message, orderData = {}) => {
  const client = clients.get(userId);
  if (client) {
    client.write(`data: ${JSON.stringify({ message, ...orderData })}\n\n`);
    console.log(`Notification sent to ${userId}`);
  }
};

// ---------------------- Order Webhook ----------------------
// Intercept order creation to send SSE notification
orderRoutes.post("/", async (req, res, next) => {
  try {
    const { productId, sellerId, buyerId, price } = req.body;

    if (!productId || !sellerId || !buyerId || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await Order.create({
      productId,
      sellerId,
      buyerId,
      price,
    });

    // Send SSE notification to seller
    sendNotification(sellerId, "New order received!", {
      orderId: newOrder._id,
      productId: newOrder.productId,
      price: newOrder.price,
      buyerId: newOrder.buyerId,
      createdAt: newOrder.createdAt,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// Clear notifications endpoint
app.delete("/api/orders/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await Order.updateMany({ sellerId: userId, read: false }, { read: true });

    // Notify SSE client to clear notifications
    const client = clients.get(userId);
    if (client) client.write(`data: ${JSON.stringify({ clear: true })}\n\n`);

    res.status(200).json({ message: "Notifications cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = { sendNotification }; // Optional export if needed elsewhere
