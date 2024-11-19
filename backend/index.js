import { mongoConnect } from "./util/database.js";
import express from "express";
import crudRoutes from './routes/crudRoutes.js';

const app = express();

app.use( express.json() );

// app.use(collectionRoutes)
app.use(crudRoutes);

if( await mongoConnect() ) {
  app.listen(3000);
} else {
  console.error('Verbindung zu mongoDb nicht möglich.');
  }