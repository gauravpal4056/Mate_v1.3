import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    
    classId:{
        type: String,
        required: true,
        min:8
    },
    className: {
        type: String,
    },
    collegeId: String,

    students: [Object],//id of students

    calendar: [Object],

    notices:[Object],

    workingdays: [Object]


})

const Class = mongoose.model('Class', classSchema)

export default Class