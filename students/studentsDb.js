const db = require('../db/dbConfig.js');

const get = () => db('students');

const getById = id =>
  db('students')
    .where({ id })
    .first();

const insert = student =>
  db('students')
    .insert(student)
    .then(ids => getById(ids[0]));

const update = (id, changes) =>
  db('students')
    .where({ id })
    .update(changes);

const remove = id =>
  db('students')
    .where({ id })
    .del();

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};


