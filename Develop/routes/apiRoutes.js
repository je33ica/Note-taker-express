const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");
//using uuid to create a unique id for entries on the post route so we can delete
//we use v4 which creats a random id
const { v4: uuidv4 } = require("uuid");
//util is helps to 
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)


router.get("/api/notes", (req, res) => {
  readFile("db/db.json", "utf8", (err, data) => { 
    
        if (err) throw err; 
      const notes = JSON.parse(data);
      res.json(notes);
      console.log("this is the GET", notes);
   
    })
   
});

router.post("/api/notes", (req, res) => {
    readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    let newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    notes.push(newNote);
    writeFile("db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err })
   
      res.send(notes);
    });
});


router.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;

  readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("this is the intial data returned", data);
    const allNotes = JSON.parse(data);
    const newAllNotes = allNotes.filter((note) => note.id !== noteId);

    writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), (err) => {
      if (err) throw err;

      console.log("this is the new DB", newAllNotes);
      console.log("Note deleted!");
    });
    res.send(newAllNotes);
    console.log("these are the new returned notes ", newAllNotes);
  });
});

module.exports = router;

// router.get("/api/notes", function(req, res) {
//     res.send(db);
//   });

// router.get("/api/notes", (req, res) => {
//     //   readFile("db/db.json", "utf8")
//     fs.readFile("./db/db.json")
//         .then((data) => {

//         const notes = JSON.parse(data) || [];
//         res.json(notes);
//         console.log("this is the GET", notes);
//         })
//         .catch((err) => {
//         console.log(err);
//         })
//     }
// );

// * POST `/api/notes` - Should receive a new note to save on the request body,
//  add it to the `db.json` file, and then return the new note to the client.

// router.post("/api/notes", (req, res) => {
//   let newNote = {
//     id: uuidv4(),
//     title: req.body.title,
//     text: req.body.text,
//   };
//   db.push(newNote);
//   console.log("this is the id on new note", newNote.id);
//   // Return the new note to the client
//   fs.writeFile("./db/db.json", JSON.stringify(db), () => {
//     res.json(db);
//   });
// });

// router.delete("/api/notes/:id", (req, res) => {
//   let noteId = req.params.id;

//   readFile("./db/db.json", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log("this is the intial data returned", data);
//     const allNotes = JSON.parse(data);
//     const newAllNotes = allNotes.filter((note) => note.id !== noteId);

//     writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), (err) => {
//       if (err) throw err;

//       console.log("this is the new DB", newAllNotes);
//       console.log("Note deleted!");
//     });
//     res.send(newAllNotes);
//     console.log("these are the new returned notes ", newAllNotes);
//   });
// });

// module.exports = router;

//         let notes = JSON.parse(data)
//         let notes = {
//             id: uuidv4(),
//             title: req.body.title,
//             text: req.body.text,
//         };
// console.log(notes);
// res.json(notes);
// console.log('this is the GET', notes);
//})
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes
//  as JSON.
// router.get("/api/notes", function (req, res) {
//   // Read the db.json file and return all saved notes as JSON
//   fs.readFile("db/db.json")
//   .then((db) => {
//     const notes = JSON.parse(db) || [];

//     res.json(notes), console.log("i am the GET notes", notes);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

// router.post("/api/notes", (req, res) => {

//   let newNote = {
//     id: uuidv4(),
//     title: req.body.title,
//     text: req.body.text,
//   };
//   db.push(newNote);
//   console.log("this is the id on new note", newNote.id);
//   // Return the new note to the client
//   writeFile("./db/db.json", JSON.stringify(newNote), () => {

//     res.json(newNote)
//     ,console.log("this is what is being added to the database", newNote);
//   });
// })

//these are the millon

// router.delete("/api/notes/:id", (req, res) => {
//         let filteredDB = db.filter(note => note.id !== req.params.id);

//     // fs.writeFile("db/db.json","utf8", (filteredDB) => {
//         console.log("this is the data",filteredDB);
//         let writeFileAsync = util.promisify(fs.writeFile);
//        writeFileAsync("./db/db.json", JSON.stringify(filteredDB)).then(() => {
//         res.status(200).send(filteredDB)
//         });

// })

// console.log(db);
// // Retrieves a note with specific id
// router.get("/api/notes/id", function(req,res) {
//     // display json for the notes array indices of the provided id
//     console.log(notes[req.params.id]);
//     res.json(notes[req.params.id]);
// });

// let writeFileAsync = util.promisify(fs.writeFile);
// writeFileAsync("./db/db.json", JSON.stringify(filteredDB), () => {
//      res.json({ok: true});
//  });
//         const notes = JSON.parse(data)
//         console.log("these are the notes",notes);
//         console.log("these are the params",req.params.id);

// console.log("the new notes in delete", notes);
//         fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
//             res.json(newNotes);
// console.log("these are the new ",newNotes);
//     }
//     )

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
