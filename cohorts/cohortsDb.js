const db = require('../db/dbConfig.js');

const get = () => db('cohorts');

const getById = id =>
  db('cohorts')
    .where({ id })
    .first();

const insert = cohort =>
  db('cohorts')
    .insert(cohort)
    .then(ids => getById(ids[0]));

const update = (id, changes) =>
  db('cohorts')
    .where({ id })
    .update(changes);

const remove = id =>
  db('cohorts')
    .where({ id })
    .del();

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

