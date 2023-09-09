import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.render('home')
});

router.get('/managerProd/:accion', (req, res)=>{
    if(req.params.accion == 'create'){
        res.render('addProduct')
    }
    if(req.params.accion == 'delete'){
        res.render('DeleteProduct')
    }
    
});

export default router;