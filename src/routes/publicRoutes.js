import { configDotenv } from 'dotenv';
import expres from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

configDotenv.apply()
const prisma = new PrismaClient();
const router = expres.Router();
const JWT_SECRET = process.env.JWT_SECRET


// Cad
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)


        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })
        res.status(201).json(userDB)
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor, tente outra hora" })

    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body
        const user = await prisma.user.findUnique({ where: {email: userInfo.email}})

        if(!user){
            return res.status(400).json({message: "usuário não encontrado"})
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Senha inválida'})
        }

        // Token JW
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'})

        res.status(200).json(token)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Erro no servidor, tente outra hora" })
    }
})


export default router