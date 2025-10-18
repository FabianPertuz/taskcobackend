// 📁 src/config/database.js
const { MongoClient } = require("mongodb");

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
      const dbName = process.env.DB_NAME || "tareasDB";

      this.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await this.client.connect();
      this.db = this.client.db(dbName);

      console.log(`✅ Conectado a MongoDB en ${uri}, base de datos: ${dbName}`);
    } catch (error) {
      console.error("❌ Error conectando a MongoDB:", error.message);
      process.exit(1);
    }
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error("Database not connected");
    }
    return this.db.collection(collectionName);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("🔌 Desconectado de MongoDB");
    }
  }

  async withTransaction(callback) {
    const session = this.client.startSession();
    try {
      let result;
      await session.withTransaction(async () => {
        result = await callback(session);
      });
      return result;
    } finally {
      await session.endSession();
    }
  }
}

module.exports = new Database();
