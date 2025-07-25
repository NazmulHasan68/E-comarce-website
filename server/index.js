import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbconnection } from './utills/dbConnection.js';
import authanticationRoute from './routes/authentication.route.js'
import { exec } from 'child_process';
import categoryRoutes from "./routes/categoryRoute.js";
import bandRoutes from "./routes/bandRoute.js"
import productRoutes from "./routes/productRoutes.js"
import heroRoutes from "./routes/heroRoute.js"
import orderRoutes from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
      origin: process.env.FONTENDURL,
      credentials: true, 
      methods: 'GET, POST, PUT, DELETE, PATCH' , 
      allowedHeaders: 'Content-Type, Authorization', 
    })
);
app.use('/public', express.static('public'));

//called api 
app.use('/api/auth', authanticationRoute)
app.use("/api/categories", categoryRoutes)
app.use("/api/band", bandRoutes)
app.use("/api/product", productRoutes)
app.use("/api/hero", heroRoutes)
app.use("/api/orders", orderRoutes)


// Routes
app.get('/', (req, res) => {
  res.send('GrowCare Backend Running');
});


app.use(express.static(path.join(__dirname, '../public_html')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});


// Start server
app.listen(port, () => {
    dbconnection()
  console.log(`Server running on http://localhost:${port}`);
});
