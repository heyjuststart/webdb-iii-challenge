const express = require('express');

const Cohorts = require('./cohortsDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cohorts = await Cohorts.get();
    res.status(200).json(cohorts);
  } catch (e) {
    /* handle error */
    res.status(500).json({
      message: 'The cohorts information could not be retrieved'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cohort = await Cohorts.getById(req.params.id);

    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: 'The cohort with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The cohort information could not be retrieved.'
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
    const cohort = await Cohorts.insert(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the cohort to the database'
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
    const cohort = await Cohorts.update(req.params.id, req.body);
    if (cohort) {
      const updatedCohort = await Cohorts.getById(req.params.id);
      res.status(200).json(updatedCohort);
    } else {
      res
        .status(404)
        .json({ error: 'The cohort with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The cohort information could not be modified.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maybeCohort = await Cohorts.getById(req.params.id);
    if (maybeCohort) {
      await Cohorts.remove(req.params.id);
      return res.status(200).json(maybeCohort);
    } else {
      return res
        .status(404)
        .json({ message: 'The cohort with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the cohort'
    });
  }
});

module.exports = router;

