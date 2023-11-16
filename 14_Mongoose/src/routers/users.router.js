import { Router } from 'express';
import { userModel } from '../models/user.model.js';


const router = Router()

router.get('/', async (req, res)=>{
    const users = await userModel.find()
    res.send(users)
});

router.post('/', async(req, res)=>{
    const {fristName, lastName, email} = req.body;

    if(!fristName || !lastName || !email){
        return res.status(400).send({ error: 'usuario invalido'})
    }
    const user = await userModel.create({
        fristName,
        lastName,
        email
    })
    res.send(user)
});


router.delete('/:uid', async(req, res)=>{
    const {uid} = req.params;
    const result = await userModel.deleteOne({_id: uid});
    res.send(result);
})

router.put('/:uid', async(req, res)=>{
    const {uid} = req.params;
    const {fristName, lastName, email} = req.body;
    
    const result = await userModel.updateOne(
        { _id: uid},
        {
            fristName,
            lastName,
            email
        }
    );
    res.send(result);
})

export default router;