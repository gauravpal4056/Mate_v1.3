import express from "express"
const router = express.router()
import {attendence} from "../controller/student"

router.get('/attendence', attendence)
