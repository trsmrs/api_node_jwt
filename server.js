import express from 'express';
import { configDotenv } from 'dotenv';
import publicRoutes from './routes/publicRoutes.js'

configDotenv.apply()
const app = express();
app.use(express.json())
const port = process.env.PORT || 8081


app.use('/', publicRoutes)


app.listen(port, ()=> console.log('running on port', port))