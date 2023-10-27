import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    courseA: {
        type: String
    },
    courseB: {
        type: String
    }
})

const Student = mongoose.model('Student', studentSchema)
export default Student