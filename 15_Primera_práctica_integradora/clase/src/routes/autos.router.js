import { Router } from "express";
import { uploader} from '../middlewares/multer.js';
import AutosManager from '../dao/db/Autosmanager.js';

const router = Router();
const autosManager = new AutosManager();

router.post('/', async(req, res)=>{
    const { name, brand, year, image } = req.body;
    const auto = await autosManager.create(name, brand, year, image)
    res.status(200).send(auto)
});



export default router