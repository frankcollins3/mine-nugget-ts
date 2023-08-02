const seedData = require('./db');
const jsonData = require('./utility/strainJSON.json');

async function seed() {
  try {
    await seedData(jsonData);
    console.log('Database seeding completed.');
  } catch (err) {
    console.error('Error while seeding the database:', err);
  }
}

seed();