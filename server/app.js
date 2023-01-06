import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import {fileURLToPath} from "url"
import cors from "cors"

//////configuration/////

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}))

import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import createCollege from './controller/createCollege.js'
// ////mongoose////
const PORT = process.env.PORT || 6001
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    app.listen(PORT, () => {
        console.log("server started on port " + PORT);
    })
}).catch(err => console.log(err));

/////routes////
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)

app.post('/gaurav',createCollege )