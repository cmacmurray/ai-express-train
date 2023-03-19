import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectionToDatabase, connectToDatabase } from './database';
dotenv.config();

const {ATLAS_URI} = process.env;

if {!ATLAS_URI) {
    console.error(  'No connection string found. Please set ATLAS_URI environment variable.');
    process.exit(1);
}

connectToDatabase(ATLAS_URI);
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api', apiRouter);

        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    }