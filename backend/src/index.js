import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({path: './.env'});

const app = express()
const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.BASE_URL,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods:['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello World again!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})