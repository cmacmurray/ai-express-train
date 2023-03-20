import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './database';
import { error } from 'console';
import { employeeRouter } from './employee.routes';

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error(  'No connection string found. Please set ATLAS_URI environment variable.');
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       // start the Express server
       app.use("/employees", employeeRouter); 
       app.listen(5200, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
 
   })
   .catch(error => console.error(error));