const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

mongoose.connect("mongodb+srv://shmok:1234@cluster0.s5lvwjl.mongodb.net/problemDB", { useNewUrlParser: true, useUnifiedTopology: true });

const problemSchema = {
  name: String,
  problem_topic: String,
  machine_name: String,
  other_machine: String,
  description: String,
  to_department: String,
  from_department: String,
  problemNumber: Number
};

const Problem = mongoose.model("Problem", problemSchema);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let newProblem = new Problem({
    name: req.body.name,
    problem_topic: req.body.problem_topic,
    machine_name: req.body.machine_name,
    other_machine: req.body.other_machine,
    description: req.body.description,
    to_department: req.body.to_department,
    from_department: req.body.from_department,
    problemNumber: req.body.problem_number
  });
  newProblem.save();

});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

