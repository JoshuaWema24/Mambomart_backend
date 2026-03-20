const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Routes
const productController = require('./controllers/products.controllers');
app.post('/products', productController.createProduct);
app.get('/getProducts', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

const salesController = require('./controllers/minimartSalescontroller');
app.post('/sales', salesController.createSalesRecord);
app.get('/getSales', salesController.getAllSalesRecords);
app.get('/sales/:id', salesController.getSalesRecordById);
app.put('/sales/:id', salesController.updateSalesRecord);
app.delete('/sales/:id', salesController.deleteSalesRecord);

const mpesaRoutes = require("./routes/mpesa.routes");


app.use("/api/mpesa", mpesaRoutes);

//suppliers routes
const suppliersController = require('./controllers/suppliers.controllers');
app.post('/suppliers', suppliersController.createSupplier);
app.get('/getSuppliers', suppliersController.getAllSuppliers);
app.get('/suppliers/:id', suppliersController.getSupplierById);
app.put('/suppliers/:id', suppliersController.updateSupplier);
app.delete('/suppliers/:id', suppliersController.deleteSupplier);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});