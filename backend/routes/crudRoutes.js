import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../util/database.js";
const router = express.Router();


// *CRUD Operations* in mongoDb
// https://www.mongodb.com/docs/manual/crud/

// >>>> Crud = Create => insertOne/inserMany
router.post("/minis", async (request, response, next) => {
  const db = getDb();
  const mini = request.body;
  
  if(typeof mini.title && typeof mini.description !== "string")  {
    return response.send(`Bitte gib einen gültigen Namen an.`);
  } 
 

  try {
  
    const res = await db.collection('minsis').insertOne(mini)
    console.log({ res });
    response.send(`Erfolgreich hinzugefügt mit id ${res.insertedId}`);
  } catch (err) {
    console.log('Mini konnte nicht hinzugefügt werden:', err);
    next(err);
  }
});


// >>>> cRud = Read => find/findOne
router.get("/minis/:id", async (request, response, next) => {
  const db = getDb();
  let miniId;
  
  // Überprüfen, ob sich in der URL eine gültige id befindet
  if( ObjectId.isValid(request.params.id) ) {
    miniId = ObjectId(request.params.id);
  } else {
    response.send('Ungültige ID');
    return false;
  }

  try {
    const mini = await db.collection('minis').findOne({_id: miniId});
   
    if(mini) {
      response.send(mini);
    } else {
      response.send(`Konnte Mini mit id ${miniId} nicht finden`);
    }
  } catch (err) {
    console.log(`Customer mit id ${miniId}konnte nicht gefunden werden:`, err);
    next(err);
  }
});


// >>>> crUd = Update => updateOne/update

router.put("/updateHardcodedCustomer", async (request, response, next) => {
  const db = getDb();
  const miniId = ObjectId('673c889cf4c720a39d7860b9');
 
  try {

    // updateOne/Many:
    // 1. Parameter: filter (welche bzw. welches document)
    // 2. Parameter: Änderungsobject (was soll geändert werden)
    const res = await db.collection('minis').updateOne(
      { _id: customerId },
      { 
        $set: { // mit $set können Felder hinzugefügt oder bearbeitet werden
          title: "Mini-App-Fallback",
          description: "Fallback",
          testfeld: "Ich bin unnötig",
        },
        $unset: { // mit $unset können einzelner Felder komplett entfernt werden
          testfeld: 1,
        }
      }
    )
    console.log({ res });
    response.send(`Es wurden ${res.modifiedCount} Dokumente geändert`, );
  } catch (error) {
    next(error);
  }
});




router.put("/minis", async (request, response, next) => {
  const db = getDb();
  let miniId;
  const title = request.body.title;

  // Überprüfen, ob sich in der URL eine gültige id befindet
  if( ObjectId.isValid(request.body.id) ) {
    miniId = ObjectId(request.body.id);
  } else {
    response.send('Ungültige ID');
    return false;
  }
 
  try {

    const res = await db.collection('minis').updateOne(
      { _id: miniId },
      { 
        $set: { title: title },
      }
    )
    console.log({ res });
    response.send(`Es wurden ${res.modifiedCount} Dokumente geändert`, );
  } catch (error) {
    next(error);
  }
});




// >>>> cruD = Delete => deleteOne/deleteMany

router.delete("/minis/:id", async (request, response, next) => {
  const db = getDb();

  // hier eigentlich ID nochmals überprüfen (isValid())
  const customerId = ObjectId(request.params.id);
 
  try {

    const res = await db.collection('minis').deleteOne({_id: miniId})
    console.log({ res });
    response.send(`Es wurde(n) ${res.deletedCount} Dokument(e) gelöscht`);
  } catch (error) {
    next(error);
  }
});


export default router;