import mongoose from 'mongoose'

const collegeSchema = new mongoose.Schema({
    collegeId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admins:[Object], 
    classes:[Object],
    students:[String],
    collegeName:{
        type: String,
        required: true
    },
})

const College = mongoose.model('College', collegeSchema)

export default College