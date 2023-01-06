import express from "express"
const router = express.Router()
import { attendencePortal } from "../controller/admin.js"

//router.get('/removestudent', removeStudent)
router.post('/setattendence', attendencePortal)
export default router