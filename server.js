import express from 'express';
import dotenv from 'dotenv';


dotenv.config()


import publicRoutes from './src/routes/publicRoutes.js'
import privateRoutes from './src/routes/privateRoutes.js'

import auth from './src/middleware/auth.js'



const app = express();
app.use(express.json())
const port = process.env.PORT || 8081


app.use('/', publicRoutes)
app.use('/', auth,privateRoutes)

app.listen(port, ()=> console.log('running on port', port))