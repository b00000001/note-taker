const express = require("express");
const path = require("path"); // Will join the base directory with the directory you're trying to access.
const app = express();
const PORT = process.env.port || 3000;
const { v4: uuidv4 } = require("uuid");
// const notes = require("./db/db.json");
const fs = require("fs");
// require db.json

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
	const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
	res.json(notes);
}); // make it so that new notes are written to db.json using the file system module.

// make an api route for posting to notes.html

app.post("/api/notes", function (req, res) {
	const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
	const body = { ...req.body };
	body.id = uuidv4();
	notes.push(body);

	fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
		res.json(notes);
	});
});

app.delete("/api/notes/:id", (req, res) => {
	const id = req.params.id;
	const data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
	const items = data.filter((item) => item.id !== id);
	fs.writeFileSync("./db/db.json", JSON.stringify(items), "utf-8");
	res.send("Success");
});

app.listen(PORT, () => {
	console.log(`listening at http://loalhost:${PORT}`);
});
