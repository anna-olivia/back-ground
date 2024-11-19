import { Db, MongoClient, ServerApiVersion }  from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const pwd = process.env.MONGO_DB_PWD;

const userName = process.env.MONGO_DB_USER;

/** @type {Db} */
let _db;


// const _database = "v0";

const _uri = `mongodb+srv://${userName}:${pwd}@cluster0.hsbbx.mongodb.net/v0?retryWrites=true&w=majority&appName=Cluster0`;

const _client = new MongoClient(_uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function mongoConnect() {

  try {
    await _client.connect();
    
    _db = _client.db(); 
    return true;
  } catch(err) {
    console.error("Connection to MongoDB Failed:", err);
    return false;
  }
}


/**
 * 
 * @returns {Db}
 */
function getDb(){
  return _db ? _db : false
}


export {mongoConnect, getDb}
