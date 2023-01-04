import Student from "../model/studentSchema"
import Class from ".../model/classSchema"
import College from "../model/collegeSchema"

export const removeStudent = async (req, res) => {
    try{
        const {studentId} = req.params;
        const student = await Student.findByIdAndDelete({_id: studentId})
        const college = await College.findOne({college})
        college.student.remove(student)
        classRoom = await Class.findOne({classId: classId})
        classRoom.student.reomove(student._id)
        classRoom.save()
        college.save()
        res.status(200).send({message: "Student deleted", status:200})
    } catch(e){
        res.status(404).json({message:e.message, status:400})
    }
}

export const creatNotice = async (req, res) => {
    try{
        const {title, description, classId} = req.body;
        const date = new Date();
        const classRoom = await Class.findOne({classId:classId});
        const notice = {title, description, date};
        classRoom.notices.push(notice);
        await classRoom.save();
        res.status(200).json({message:"notice created", status:200});
    }catch(err){
        res.status(400).json({message: err.message, status:200})

    }
}

export const createClassRoom = async (req, res) => {
    try{
        const {classId, className, collegeId} = req.body;
        const classRoom = new Class({classId, className, collegeId})
        const savedClass = await classRoom.save()
        const college = await College.findOne({collegeId: collegeId})
        college.classes.push({classId, className})
        res.status(200).json({message:`class room created in ${collegeId}`, status:200})
    }catch(e){
        res.status(400).json({message: err.message, status:400})
    }
}

export const reorient = async (req, res) => {
    try{
        const {rollNo} = req.body;
        const student = await Student.findOne({rollNo:rollNo});
        if(!student){
            res.status(404).json({message:"Student not found", status:404})
        }
        student.orient = 3;
        savedstudent = student.save();
        res.status(200).json({message:"success oriented", status:200})
    }catch(e){
        res.status(400).json({message: err.message, status:400})
    }
}

export const attendencePortal = async (req, res) => {
    try{

        const {classId, time, title, dayTitle} = req.body;
        const classRoom = await Class.findone({classId: classId})
        if(!classRoom){
            res.status(404).json({message:"Class not found", status:404})
        }
        classRoom.attendence = {title: title, time: time};
        var res = new Date();
        classRoom.workingDay.push(res)
        classRoom.save();

    }catch(e) {
        res.status(400).json({message: err.message, status:400})
    }
} 