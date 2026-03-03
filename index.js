const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socketIo = require('socket');
const http = require('http');
require('dotenv').config();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});


// Socket.IO
io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
    });
});

// =====================
// Routes
// =====================
const productController = require('./controllers/products.controllers');
app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

const salesController = require('./controllers/minimartSalescontroller');
app.post('/sales', salesController.createSalesRecord);
app.get('/sales', salesController.getAllSalesRecords);
app.get('/sales/:id', salesController.getSalesRecordById);
app.put('/sales/:id', salesController.updateSalesRecord);
app.delete('/sales/:id', salesController.deleteSalesRecord);

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});