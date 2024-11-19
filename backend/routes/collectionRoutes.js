import express from "express";
import { getDb } from "../util/database.js";
const router = express.Router();


router.get("/test", (request, response) => {
  response.send('Läuft');
});



router.get("/createCollectionWine", async (request,response, next) => {
  const db = getDb(); 

  try {
    const res = await db.createCollection('wine');
    console.debug("res", res);
    response.send('Schau in die console oder compass');
  } catch(err) {
    console.error('Collection konnte nicht erstellt werden:', err);
    response.status(500).send(`Collection konnte nicht erstellt werden: ${err}`)
  }
});


router.get("/showCollections", async (request, response, next) => {
  const db = getDb();

  try {
    const collections = await db.listCollections().toArray();
    

    console.debug("collections", collections);
    response.send(collections);
  } catch (error) {
    console.error("", error);
    next(err);
  }

});




router.get("/createCollectionWineExtended", async (request, response, next) => {
  const db = getDb();

  const collections = await db.listCollections().toArray(); // eigentlich auch diese Zeile in try catch
  const wineCollection = collections.find(coll => coll.name === 'wine');

  if(wineCollection) {
    response.send('Diese Collection existiert bereits')
  } else {
  
    try {
      db.createCollection('wine');
      response.send('Schau in die console oder compass');
    } catch (error) {
      console.error("Fehler beim Erstellen der Collection", error);
      next(error);
    }
  }
});



export default router;