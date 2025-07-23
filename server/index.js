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


//called api 
app.use('/api/auth', authanticationRoute)








// parse_nc4.py এর সঠিক path দিয়ে দাও
const scriptPath = path.join(__dirname, 'parse_nc4.py');
// sample.nc4 এর সঠিক path
const nc4FilePath = path.join(__dirname, 'data', 'sample.nc4');

exec(`python ${scriptPath} ${nc4FilePath}`, (err, stdout, stderr) => {
  if (err) {
    console.error("Error:", stderr);
    return;
  }
  try {
    const parsedData = JSON.parse(stdout);
    console.log(parsedData);
  } catch (parseErr) {
    console.error("JSON parse error:", parseErr);
  }
});





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
