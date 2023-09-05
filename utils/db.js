const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Use environment variables or default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.isConnected = false;

    // Connect to the MongoDB server
    this.connect();
  }

  async connect() {
    try {
      // Connect to the MongoDB server
      await this.client.connect();
      this.isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async isAlive() {
    const isConnected = await dbClient.client.isConnected();
    return this.isConnected;
  }catch (error) {
   console.error('Error checking MongoDB connection:', error);
   return false
  }

  async nbUsers() {
    try {
      if (this.isConnected) {
        const usersCollection = this.client.db().collection('users');
        const count = await usersCollection.countDocuments();
        return count;
      } else {
        console.error('Not connected to MongoDB');
        return 0;
      }
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      if (this.isConnected) {
        const filesCollection = this.client.db().collection('files');
        const count = await filesCollection.countDocuments();
        return count;
      } else {
        console.error('Not connected to MongoDB');
        return 0;
      }
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }

  async close() {
    try {
      // Close the MongoDB connection
      await this.client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;