const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let orders = [];
let currentId = 1;

app.use(express.static(__dirname));

// API Endpoints

// Add a new order
app.post("/orders", (req, res) => {
  const { dish, price, table } = req.body;
  const order = { id: currentId++, dish, price, table };
  orders.push(order);
  res.status(201).json(order);
});

// Get orders for a table
app.get("/orders/:table", (req, res) => {
  const table = req.params.table;
  const tableOrders = orders.filter(order => order.table === table);
  res.json(tableOrders);
});

// Delete an order by ID
app.delete("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(order => order.id !== id);
  res.status(204).send();
});

// Serve index.html for root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
