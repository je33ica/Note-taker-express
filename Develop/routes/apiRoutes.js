//this api route folder is to contain the data shown to the user where they contain
//get/post/delete
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const db = require("../db/db.json");
//using uuid to create a unique id for entries on the post route so we can delete
//we use v4 which creats a random id
const { v4: uuidv4 } = require("uuid");
const userId = uuidv4();



// * GET `/api/notes` - Should read the `db.json` file and return all saved notes
//  as JSON.
router.get("/api/notes", (req, res) =>{

    res.json(db);
});

// * POST `/api/notes` - Should receive a new note to save on the request body,
//  add it to the `db.json` file, and then return the new note to the client.
router.post("/api/notes", (req, res) => {
    let newNote = {
        //adds a unique ID using uuid so we can acces and delete later
        noteId: userId,
        title: req.body.title,
        text: req.body.text,
    };
    db.push(newNote)
     // Return the new note to the client
     fs.writeFile("./db/db.json", JSON.stringify(db), () => {
             res.json(db);
         });
})

router.delete("/api/notes:id", (req, res) => {


})
// * DELETE `/api/notes/:id` - Should receive a query parameter containing
// the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved.
// In order to delete a note, you'll need to read all notes from the `db.json` file,
// remove the note with the given `id` property,
// and then rewrite the notes to the `db.json` file.
module.exports = router;