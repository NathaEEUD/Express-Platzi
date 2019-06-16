const MongoClient = require('mongodb').MongoClient;
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?authSource=admin&ssl=true`; // prettier-ignore

class MongoLib {
  constructor() {
    console.log('mongo uri::::', MONGO_URI);
    // this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.instance = null;
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      // this.client.connect(err => {
      //   if (err) {
      //     reject(err);
      //   }

      //   console.log('Connected succesfully to mongo');
      //   resolve(this.client.db(this.dbName));
      // });
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
}

module.exports = MongoLib;
