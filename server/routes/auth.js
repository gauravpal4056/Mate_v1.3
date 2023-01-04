import express  from 'express'
const router = express.Router();
import {registerStudent, registerAdmin, loginAdmin} from '../controller/auth.js';


router.post('/registerstudent', registerStudent);
router.post('/registeradmin', registerAdmin);

router.post('/loginadmin', loginAdmin);

router.get('/registerstudent', (req, res) => {
    res.send("register student hit")
});  

export default router;