import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({

    rollNo:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    classId: String,

    collegeId: String,

    orientation:{
        type: Number//only 3 chances for relogin
    },
    attendence:[Object],

    attendenceNo: Number
})

const Student = mongoose.model('Student', studentSchema)

export default Student