const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
const Note = require('../model/Note');
const { body, validationResult } = require('express-validator');

//Route 1:Get all the notes using- Get /api/notes/fetchallnotes 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 2:Add a new note using- post /api/notes/addnote .Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = note.save()
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3- Update an existing note using - Put api/notes/updatenote .Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag}=req.body
    //Create a new note object
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //find the note to be updated and update it
    let note=await Note.findById(req.params.id)
    if(!note){
        return res.status(401).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// Route 4- delete an existing note using - Delete api/notes/deletenote .Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
    let note=await Note.findById(req.params.id)
    if(!note){
        return res.status(401).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"note is successfully deleted",note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router