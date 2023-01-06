import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    
    classId:{
        type: String,

    },
    className: {
        type: String,
    },
    collegeId: String,

    students: [Object],//id of students

    calendar: [Object],

    notices:[Object],

    workingdays: [Object],
    attendenceTime:{
        type: String,
    }


})

const Class = mongoose.model('Class', classSchema)

export default Class