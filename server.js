const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "home.html"));
});

app.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "register.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "login.html"));
});

app.get("/dashboard", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "dashboard.html"));
});

app.get("/discover", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "discover.html"));
});

app.get("/api/status", (req, res) => {
	res.json({
		project: "Online Portfolio Builder",
		backend: "Express running",
		time: new Date().toISOString()
	});
});

app.get("/api/routes", (req, res) => {
	res.json({
		pages: ["/", "/register", "/login", "/dashboard", "/discover"],
		api: ["/api/status", "/api/routes"]
	});
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
