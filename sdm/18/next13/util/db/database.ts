  import * as mongoDB from "mongodb";


  /*export*/ async function connectToDatabase () {
  const url = "mongodb+srv://de0811:qiem22@cluster0.dk8maea.mongodb.net/?retryWrites=true&w=majority";
    // dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db("forum");
   
    return db;
 }

 
export async function getCollection (collectionName: string) {
    const db = await connectToDatabase();
    return db.collection(collectionName);
}