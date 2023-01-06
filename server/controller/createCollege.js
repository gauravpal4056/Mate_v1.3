import College from "../model/collegeSchema.js"
import bcrypt from "bcrypt"


const createCollege = async (req, res) =>{
    const {collegeId, password, collegeName, } = req.body;
    const isCollege = await College.findOne({collegeId: collegeId});
    if(isCollege){
        return res.status(402).json({message: "already created", status: 402})
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    const college = new College({
        collegeName,
        collegeId,
        password: hashPassword
    })
    await college.save()
     return res.status(200).json({message: 'Success', status:200})
}
export default createCollege