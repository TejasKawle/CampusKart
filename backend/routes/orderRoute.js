const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Map to store SSE connections: userId => res
const sseClients = new Map();

// SSE endpoint for a specific user
router.get("/stream/:userId", (req, res) => {
  const { userId } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Keep connection alive
  res.write("\n");

  sseClients.set(userId, res);
  console.log(`SSE connected for user: ${userId}`);

  req.on("close", () => {
    sseClients.delete(userId);
    console.log(`SSE disconnected for user: ${userId}`);
  });
});

// Utility function to send notification to a specific user
const sendNotification = (userId, notification) => {
  const client = sseClients.get(userId);
  if (client) {
    client.write(`data: ${JSON.stringify(notification)}\n\n`);
    console.log(`Notification sent to user: ${userId}`);
  }
};

// Create order
router.post("/", async (req, res) => {
  try {
    const { productId, sellerId, buyerId, price } = req.body;

    if (!productId || !sellerId || !buyerId || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({ productId, sellerId, buyerId, price });

    await order.populate("productId", "title price");
    await order.populate("buyerId", "name email");
    await order.populate("sellerId", "name email");

    const notification = {
      _id: order._id,
      productId: order.productId,
      buyerId: order.buyerId,
      price: order.price,
      createdAt: order.createdAt,
      message: `${order.buyerId.name} bought your ${order.productId.title} for ₹${order.price}`,
    };

    // Send SSE notification to seller ONLY
    sendNotification(sellerId.toString(), notification);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// In your orderRoutes.js (backend)
// Get orders for a seller
router.get("/seller/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      sellerId: req.params.userId, // Only get orders where user is the seller
    })
      .populate("productId", "title price")
      .populate("buyerId", "name email")
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear notifications for a user
// Clear notifications for a seller
router.patch("/clear/:userId", async (req, res) => {
  try {
    await Order.updateMany(
      { sellerId: req.params.userId, read: false }, // Only clear seller's notifications
      { $set: { read: true } }
    );

    // Notify client to clear notifications
    sendNotification(req.params.userId, { clear: true });

    res.json({ message: "Notifications cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark single order as read
router.patch("/:orderId/read", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { read: true },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ buyerId: req.params.userId }, { sellerId: req.params.userId }],
    })
      .populate("productId", "title price")
      .populate("buyerId", "name email")
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
