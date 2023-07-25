const express = require('express');
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
const notesModel = require("../Models/Notes");
const { query, validationResult, body } = require('express-validator');  //to verify the coming inputs



//ROUTE 1: get all the notes using: GET "api/notes/fetchallnotes"
try {
    router.get('/fetchallnotes', fetchuser, async (req, resp) => {
        const notes = await notesModel.find({ user: req.user.id });
        resp.json(notes);
    });
} catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal server error occured")
}



//ROUTE 2: add a new note using: POST "api/notes/addnote"   login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description myst be atleast 15 characters').isLength({ min: 15 })
], async (req, resp) => {

    //if there are errors, return bad request and the error
    const result = validationResult(req);
    if (!result.isEmpty()) {

        return resp.status(400).json({ errors: result.array() });
    }


    const { title, description, tag } = req.body;


    try {
        const note = new notesModel({
            title, description, tag, user: req.user.id
        });

        const savednote = await note.save();

        resp.json(savednote);
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }

})




//ROUTE 3: Update and existing note using: PUT "api/notes/updatenote"   login required

router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description myst be atleast 15 characters').isLength({ min: 15 })
], async (req, resp) => {

    //if there are errors, return bad request and the error
    const result = validationResult(req);
    if (!result.isEmpty()) {

        return resp.status(400).json({ errors: result.array() });
    }
    const { title, description, tag } = req.body;


    try {
        // Create a newNote object 
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find a note to update and update it
        const note = await notesModel.findById(req.params.id);
        if (!note) { return resp.status(404).send("Not Found"); }


        //    console.log(note.user.toString());
        //    console.log(req.user.id);

        //here note.user is user in notes collection which is a id of the user who created that note and req.user.id is the id of the user logged in

        if (note.user.toString() !== req.user.id) { return resp.status(401).send("Bad Request"); }

        const updatenote = await notesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        resp.json({ updatenote });
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }




})




//ROUTE 4: Delete note using: DELETE "api/notes/deletenote"   login required

router.delete('/deletenote/:id', fetchuser, async (req, resp) => {

    try {
        // Find a note to delete and delete it
        const note = await notesModel.findById(req.params.id);
        if (!note) { return resp.status(404).send("Not Found"); }

        //here note.user is user in notes collection which is a id of the user who created that note and req.user.id is the id of the user logged in

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) { return resp.status(401).send("Bad Request, Not Allowed"); }

        const deletenote = await notesModel.findByIdAndDelete(req.params.id);

        resp.json({ "success": "Note has been deleted", note: deletenote });

    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }

})





module.exports = router