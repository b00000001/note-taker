const express = require("express");
const path = require("path"); // Will join the base directory with the directory you're trying to access.
const app = express();
const PORT = process.env.port || 3000;
const { v4: uuidv4 } = require("uuid");
const note = require("./db/db.json");
const fs = require("fs");
// require db.json

app.listen(PORT, () => {
	console.log(`listening at http://loalhost:${PORT}`);
});

// setup path for index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

// setup route for notes.html
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// fix errors on notes page styling (stylesheet error and script.js error);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup route for /api/notes/
app.get("/api/notes", (req, res) => {
	res.json(note);
}); // make it so that new notes are written to db.json using the file system module.

// make an api route for posting to notes.html

app.post("/api/notes", function (req, res) {
	const body = { ...req.body };
	body.uuid = uuidv4();
	console.log(body);
	note.push(body);

	fs.writeFile("./db/db.json", JSON.stringify(note), (err) => {
		res.json(note);
	});
});

// every post should have a response

// setup route for deleting noteList
/* 
- read file 
- parse
- make sure array index is the same as post
- filter array index
- save to file 
- return success message */
// make function that does fetch for /api/notes.

// save posts to db.json

//uuid may be needed for giving posts index numbers
