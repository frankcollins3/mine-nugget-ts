const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'minenugget',
  password: 'esppsi777',
  port: 5432,
  max: 50,
});

const seedData = async (data) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Clear existing data in the strains table
    await client.query('DELETE FROM strains');

    // Insert new data from the JSON file
    for (const strain of data.strains) {
      await client.query(
        `INSERT INTO strains (strain, strainid, dominant, funfact, parents, taste, smell, gold, nugget, thc, cbd)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          strain.strain,
          strain.strainid, // Convert strainId to integer using parseInt()
          strain.dominant,
          strain.funfact,
          strain.parents,
          strain.taste,
          strain.smell,
          strain.gold,
          strain.nugget,
          strain.thc,
          strain.cbd,
        ]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedData;

/*
minenugget=# CREATE TABLE strains (
  minenugget(# id SERIAL PRIMARY KEY,
  minenugget(# strain VARCHAR(255) NOT NULL,
  minenugget(# strainid INT NOT NULL,
  minenugget(# dominant VARCHAR(255) NOT NULL,
  minenugget(# funfact TEXT NOT NULL,
  minenugget(# parents VARCHAR(255) NOT NULL,
  minenugget(# taste VARCHAR(255) NOT NULL,
  minenugget(# smell VARCHAR(255) NOT NULL,
  minenugget(# gold VARCHAR(255) NOT NULL,
  minenugget(# nugget VARCHAR(255) NOT NULL,
  minenugget(# thc VARCHAR(255) NOT NULL,
  minenugget(# cbd VARCHAR(255) NOT NULL
  minenugget(# );
*/