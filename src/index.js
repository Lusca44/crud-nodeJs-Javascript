const express = require("express");
const app = express();
const { uuid } = require("uuidv4");
app.use(express.json())
const port = 8080;

const projects = [];

function logRoutes(req, res, next) {
    const { method, url } = req;
    const route = `[${method.toUpperCase()}] ${url}`;
    console.log(route);
    return next();
}

// app.use(logRoutes);

app.get("/projects", logRoutes, (req, res) => {
    const { title } = req.query;
    const results = title ? projects.filter(project => project.title.includes(title)) : projects;
    res.json(results);
});

app.post("/projects", (req, res) => {
    const { title, owner } = req.body;
    const id = uuid();

    const project = {
        id,
        title,
        owner
    };

    projects.push(project);
    res.json(project);
});

app.put("/projects/:id", (req, res) => {

    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project not found" });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;
    res.json(project);
});

app.delete("/projects/:id", (req, res) => {

    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project not found" })
    }

    projects.splice(projectIndex, 1);
    res.status(204).json([]);
});



app.listen(port, () => {
    console.log("SENTA PUA");
})