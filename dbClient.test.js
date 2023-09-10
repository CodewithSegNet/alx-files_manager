// Import the DBClient instance from db.js
const dbClient = require('./utils/db');

describe('DBClient', () => {
  // Before running any tests, connect to the database
  beforeAll(async () => {
    await dbClient.connect();
  });

  // After all tests, close the database connection
  afterAll(async () => {
    await dbClient.close();
  });

  it('should connect to the database', () => {
    expect(dbClient.isAlive()).toBe(true);
  });

  it('should retrieve the number of users', async () => {
    const userCount = await dbClient.nbUsers();
    expect(userCount).toBeGreaterThanOrEqual(0);
  });

  it('should retrieve the number of files', async () => {
    const fileCount = await dbClient.nbFiles();
    expect(fileCount).toBeGreaterThanOrEqual(0);
  });
});
