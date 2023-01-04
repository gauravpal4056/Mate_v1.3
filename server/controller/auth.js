import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Student from "../model/studentSchema.js"
import Admin from "../model/adminSchema.js"
import Class from"../model/classSchema.js"
import College from "../model/collegeSchema.js"

export const registerStudent = async (req, res) => {

    try{
        const {batch, name, rollNo, password, collegeId} = req.body
        const college = await College.findOne({collegeId: collegeId})
        const student = await Student.findOne({rollNo: rollNo})
        if(student){
            return res.status(400).json({message:"student already exists", status:"400"})
        }

        if(!college){
            return res.status(400).json({message:"College not found", status:"400"})
        }

        const classRoom = await Class.findOne({ classId: batch })
        if(!classRoom){
            return res.status(400).json({message:"class not found", status:"400"})
        }

        const salt = await bcrypt.genSalt()
        const hash_password = await bcrypt.hash(password, salt)
        const newStudent = new Student({
            rollNo,
            name,
            password: hash_password,
            classId: classRoom._id,
            collegeId: college._id,
            collegeName:college.name
        })
        const savedStudent  = await newStudent.save();
        classRoom.students.push(savedStudent);
        college.students.push(savedStudent);
        await college.save();
        await classRoom.save();
        res.status(201).json({user: savedStudent, message: "new student created", status: "201"})
    } catch(e){
        console.log(e);
        res.status().json({message: e.message, status: "500"} )
    }

}

export const registerAdmin = async (req, res) => {

    try{
        const {name, email, password, collegeId, collegePassword} = req.body
        const admin = await Admin.findOne({emal: email})
        if(admin){
            return res.status(400).json({message:"admin email already exists", status:"400"})

        }
        const college = await College.findOne({collegeId:collegeId})
        if(!college){
            return res.status(400).json({message:"college not found", status:400})
        }

        const isMatch = await bcrypt.compare(collegePassword, college.password);
        if(!isMatch){
            return res.status(401).json({message:"invalid credential", status:"401"})
        }

        const salt = await bcrypt.genSalt()
        const hash_password = await bcrypt.hash(password, salt)

        const newAdmin = new Admin({
            name,
            email,
            password: hash_password,
            collegeId,
        })
        const savedAdmin  = await newAdmin.save();
        college.admins.push({name:savedAdmin,email:savedAdmin.email });
        res.status(201).json({user: savedAdmin, message: "new admin created", status: "201"})

    } catch(e){
        console.log(e);
        res.status().json({message: e.message, status: "500"} )
    }

}

export const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await Admin.findOne({email: email})
        if(!user){
            return res.status(400).json({message: "User not found", status: "400"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: "invalid credential", status: "400"})
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({user, token})

    }catch(err){
        res.status(500).json({error: err, status:"500"})
    }
}
export const studentLogin = async (req, res) => {
    try{
        const {rollNo, batch, password } = req.body
    }
    catch(e){
        res.status(500).json({error: e, status:"500"})
    }
}