const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?authSource=admin&ssl=true`; // prettier-ignore

class MongoLib {
  constructor() {
    console.log('mongo uri::::', MONGO_URI);
    this.instance = null;
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {
        if (err) reject(err);
        if (client) {
          console.log('Connected succesfully to mongo');
          console.log('client:::::', client);
          console.log('client.db:::::', client.db(this.dbName));
          this.instance = client;
          resolve(client.db(this.dbName));
        } else {
          reject('An error ocurred when connecting to mongo');
        }
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
