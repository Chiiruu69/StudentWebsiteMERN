const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/studentsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define student schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

// Define student model
const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/students', async (req, res) => {
  const { name, email, phone } = req.body;
  const student = new Student({ name, email, phone });
  try {
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {