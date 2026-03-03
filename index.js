const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
 
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    }
);
});

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/minimart', { useNewUrlParser: true, useUnifiedTopology: true })
   // .then(() => console.log('MongoDB connected'))
  //  .catch(err => console.log(err));


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

// start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
