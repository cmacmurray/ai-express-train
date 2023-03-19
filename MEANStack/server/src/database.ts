import * as mongodb from 'mongodb';
import { Employee } from './employee';

export const collections: {
    employees: mongodb.Collection<Employee>;
} = {};

export async function connectToDatabase(uri: string) 
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const = client.db("meanStackexample");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;
async function applySchemaValidation(db: mongodb.Db) {
    const jsoneSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id:{},
                    name: {
                        bsonType: "string",
                        description: "'name' must be a string and is required",
                    },
                position: {
                    bsonType: "string",
                    description: "'position' must be a string and is required", 
                    minLength: 5
                },
                level: {
                    bsonTyupe: "string",
                    description: "'level' must be a string and is required",
                    enum: ["junior", "mid", "senior"],
                },
            },
        }
    },
};

await db.command({
    collMod: "employees",
    validator: jsonSchema,
    validationLevel: "strict",
}).catch(async (error: mongodb.MongoServerError) => {
    if(error.codeName === 'NamespaceNotFound') {
        await db.createCollection("employees", {
            validator: jsonSchema,
            validationLevel: "strict",
        });
    }
}