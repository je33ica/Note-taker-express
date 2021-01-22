//this api route folder is to contain the data shown to the 
//user where they contain get/post/delete
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
router.get("/api/notes", function (req, res) {
    // Read the db.json file and return all saved notes as JSON
    
    res.json(db);
    
  });

// * POST `/api/notes` - Should receive a new note to save on the request body,
//  add it to the `db.json` file, and then return the new note to the client.
router.post("/api/notes", (req, res) => {
    let newNote = {
        id: userId,
        title: req.body.title,
        text: req.body.text,
    };
    db.push(newNote)
    console.log('this is the id on new note', newNote.id);
    // Return the new note to the client
    fs.writeFile("./db/db.json", JSON.stringify(db), () => {
        res.json(db);
    });
})


// console.log(db);
// // Retrieves a note with specific id
// router.get("/api/notes/id", function(req,res) {
//     // display json for the notes array indices of the provided id
//     console.log(notes[req.params.id]);
//     res.json(notes[req.params.id]);
// });

router.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json","utf8", function(err,data){
        console.log("this is the data",data);
        const notes = JSON.parse(data)
        console.log("these are the notes",notes);
        console.log("these are the params",req.params.id);
    }
    )})


    //     const notes = JSON.parse(data) || [];
    //     const newNotes = notes.filter(note => note.id !== req.params.id)
    //     writeFile("db/db.json", JSON.stringify(newNotes)).then(() => {
    //       res.json(newNotes);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // });

// router.delete("/api/notes/:id", (req, res) => {
//   //  console.log("this is the selected id", req);
//   console.log("this is the selected id", req.params); 
//   fs.readFile("./db/db.json","utf8",)
//   .then((data) => {
//     const notes = JSON.parse(data)
//     console.log(notes);
//   });
 
// })
//   let noteToDelete = req.params.id;
//   const remove = db.filter(item => item.id ! == noteToDelete)
           



// * DELETE `/api/notes/:id` - Should receive a query parameter containing
// the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved.
// In order to delete a note, you'll need to read all notes from the `db.json` file,
// remove the note with the given `id` property,
// and then rewrite the notes to the `db.json` file.
module.exports = router;