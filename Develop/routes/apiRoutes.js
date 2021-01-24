const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");
//using uuid to create a unique id for entries on the post route so we can delete
//we use v4 which creats a random id
const { v4: uuidv4 } = require("uuid");
//util is helps to
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

router.get("/api/notes", (req, res) => {
    readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
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
            if (err) throw err;
        });
        res.send(notes);
    });
});

router.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter((note) => note.id !== noteId);
        writeFile("./db/db.json", JSON.stringify(newAllNotes), (err) => {
            if (err) throw err;
        });
        res.send(newAllNotes);
    });
});

module.exports = router;
