import expres from 'express';

const router = expres.Router();



// Cad
router.post('/cadastro', (req, res)=>{
    const user = req.body

    res.status(201).json(user)
})


export default router