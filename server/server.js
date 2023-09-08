const { default: mongoose } = require("mongoose");
require("dotenv/config");
const express = require("express");

const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);


const io = socketIo(server);



const cors = require("cors");

const userRouter = require("./Routers/userRoutes");
const productRouter = require("./Routers/productRoutes");
const orderRouter = require("./Routers/orderRoutes");
const cartRoutes = require("./Routers/cartRoutes");





app.use(cors());
app.use(express.json());

// post request url
app.use("/api/user", userRouter);

app.use("/products", productRouter.router);

app.use("/api/orders", orderRouter);

app.use("/api/cart", cartRoutes);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Connection Failed", err));

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


io.on('connection', (socket) => {
    console.log('Socket connected');
    // Add real-time logic here
  });