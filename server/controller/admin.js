import Student from "../model/studentSchema.js"
import Class from "../model/classSchema.js"
import College from "../model/collegeSchema.js"

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

export const createNotice = async (req, res) => {
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
        const existClass = await Class.findOne({classId: classId})
        if(existClass){
            return res.status(404).json({message: "Class already exists", status:404})
        }
        const classRoom = new Class({classId, className, collegeId})
        const savedClass = await classRoom.save()

        const newCollege = await Class.updateOne({collegeId: collegeId}, {
            $push:{
                classes: savedClass
            }
        },{
                new:true 
            })
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
        const {classId, time, title} = req.body;
        const classRoom = await Class.findOne({ classId: classId     })
        if(!classRoom){
            return res.status(404).json({message:"class not found", status:404})
        }
        const workingdays =classRoom.workingdays  
        let today = new Date().toISOString().split('T')[0];
        if(workingdays[workingdays.length-1]!==today){
        const newClassRoom = await Class.updateOne({_id: classRoom._id}, {
            $push:{
                workingdays: today
            }, $set:{
                attendenceTime: time
            }
        },{
                new:true 
            }) 
            console.log("new working updated");
        }else{
            const newClassRoom = await Class.updateOne({_id: classRoom._id}, {
                $set:{
                    attendenceTime: time
                }
            },{
                    new:true 
            })
            console.log("no update working day");
        }
        
        return res.status(200).json({message:`time set for {$time}`, status:200})
    }catch(e) {
        console.log("catch block hit" + e);
        res.status(400).json({message: e.message, status:400})
    }
} 