import College from "../model/collegeSchema.js"

const createCollege = async (req, res) =>{
    const {collegeId, password, collegeName, } = req.body;
    const college = await College.findOne({collegeId: collegeId});
    if(college){
        return res.status(402).json({message: "already created", status: 402})
    }
    const salt = await bryct.genSalt();
    const hashPassword = await bryct.hash(password, salt)
    college = new College({
        collegeName,
        password: hashPassword
    })
}