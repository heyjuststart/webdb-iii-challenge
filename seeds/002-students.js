exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(() => knex('cohorts'))
    .then(function(cohorts) {
      // generate random entries
      const entries = [];
      for (let i = 0; i < 10; i++) {
        entries.push({
          name: `student${i}`,
          cohort_id: cohorts[Math.floor(Math.random() * cohorts.length)].id
        });
      }
      // Inserts seed entries
      return knex('students').insert(entries);
    });
};
