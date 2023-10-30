import { response, Request, Response } from "express"
import Student from '../model/studentSchema.ts'


//Show list of students
 const index = (req:Request,res:Response) => {
    Student.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

 const show = (req:Request,res:Response) => {
    console.log(req.body)
    let username = req.body.username
    // console.log(username)
    Student.findOne({username: username})
    
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

 const store = (req:Request,res:Response) => {
    console.log(req.body)
    let student = new Student({
        username: req.body.username,
        courseA: req.body.courseA,
        courseB: req.body.courseB
    })
    student.save()
    .then(response => {
        res.json({
            msg: "Student saved"
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

 const update = (req:Request,res:Response) => {
    console.log(req.body)
    let username = req.body.username
    // console.log(username)
    // let MyQuery = {}
    // let updatedData = { 
    //     $set:{
    //         courseA: req.body.courseA,
    //         courseB: req.body.courseB
    //     }
    // }
    Student.findOneAndUpdate({username : username}, {courseA: req.body.courseA,courseB: req.body.courseB})
    .then(response => {
        res.json({
            msg: "Student updated"
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}


 const destroy = (req:Request,res:Response) => {
    let username = req.body.username
    Student.findOneAndDelete({username : username})
    .then(response => {
        res.json({
            msg: "Student deleted"
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

export {
    index, show, store, update, destroy
}