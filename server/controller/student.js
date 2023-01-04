import Class from "../model/classSchema"
import Student from "../model/studentSchema"

export const attendencePortal = async (req, res) => {
    const {classId} = req.params.classId;
    const classRoom = await Class.findOne({classId: classId})
    var currentdate = new Date();
    var time = currentdate.getHours();
    if(classRoom.attendence.time === time){
        return res.status(200),json({message:" Attendence portal open", status: "200"})
    }
    return res.status(404),json({message: "attendence portal closed", status: "404"})

}

export const attendenceMark = (req,res) => {
    const {rollNo} = req.body
    const student = Student.findOne({rollNo: rollNo})
    const attendedDate = student.attendence[student.attendece.length - 1]
    if(attendedDate.time.getDate() === new Date().getDate()){
        return res.status(404),json({message:" already marked ", status: "404"})
    }
    student.attedence.push(new Date())
    const attended = student.attendenceNo;
    attended++;
    student.attendenceNo = attended;
    student.save();
}

export const dashboard = async (req, res) => {
    const {rollNo} = req.params.rollNo;
    try{
        const student = await Student.findOne({rollNo: rollNo})
        const classRoom = await Class.findOne({classId: classId})
        const res = {
            student: student,
            classRoom: classRoom,
        }
        res.status(200).json({message: "dashboard fetched", status:"200"})
    }catch(e){
        res.status(400).json({message: e.message, stats: "400"})
    }
    

    
}
