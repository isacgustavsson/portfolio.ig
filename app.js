const express = require("express"); // loads the express package
const { engine } = require("express-handlebars"); // loads handlebars for Express
const port = 8080; // defines the port
const app = express(); // creates the Express application

// defines handlebars engine
app.engine("handlebars", engine());
// defines the view engine to be handlebars
app.set("view engine", "handlebars");
// defines the views directory
app.set("views", "./views");

// define static directory "public" to access css/ and img/
app.use(express.static("public"));

// MODEL (DATA)
const workItems = [
  { id: "0", name: "Web Development" },
  { id: "1", name: "Game Development" },
  { id: "2", name: "Graphic Design" },
  { id: "3", name: "User Experience Design" },
];

// CONTROLLER (THE BOSS)
// defines route "/"
app.get("/", function (request, response) {
  response.render("home.handlebars");
});

// defines route "/humans"
app.get("/work", function (request, response) {
  const model = { listItems: workItems }; // defines the model
  // in the next line, you should send the abovedefined
  // model to the page and not an empty object {}...
  response.render("work.handlebars", model);
});

app.get("/work/:id", function (request, response) {
  const model = workItems[request.params.id]; // defines the model

  // in the next line, you should send the abovedefined
  // model to the page and not an empty object {}...
  response.render("projectItem.handlebars", model);
});

// defines the final default route 404 NOT FOUND
app.use(function (req, res) {
  res.status(404).render("404.handlebars");
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`);
});
