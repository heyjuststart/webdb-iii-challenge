
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'cohort1'},
        {name: 'cohort2'},
        {name: 'cohort3'}
      ]);
    });
};
