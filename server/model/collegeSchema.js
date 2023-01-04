import mongoose from 'mongoose'

const collegeSchema = new mongoose.Schema({
    collegeId:String,
    password:String,
    admins:[Object], 
    classes:[Object],
    students:[String],
    collegeName:String
})

const College = mongoose.model('College', collegeSchema)

export default College