const express = require('express');

const Students = require('./studentsDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Students.get();
    res.status(200).json(students);
  } catch (e) {
    /* handle error */
    res.status(500).json({
      message: 'The students information could not be retrieved'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Students.getById(req.params.id);

    if (student) {
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json({ message: 'The student with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The student information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: 'Please provide a name'
      });
    }
    const student = await Students.insert(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the student to the database'
    });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: 'Please provide a name'
    });
  }
  try {
    const student = await Students.update(req.params.id, req.body);
    if (student) {
      const updatedStudent = await Students.getById(req.params.id);
      res.status(200).json(updatedStudent);
    } else {
      res
        .status(404)
        .json({ error: 'The student with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The student information could not be modified.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maybeStudent = await Students.getById(req.params.id);
    if (maybeStudent) {
      await Students.remove(req.params.id);
      return res.status(200).json(maybeStudent);
    } else {
      return res
        .status(404)
        .json({ message: 'The student with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the student'
    });
  }
});

module.exports = router;

