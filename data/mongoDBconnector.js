import { MongoClient } from "mongodb"

export default function MongoDBconnector(
    //borrowed from Prof
    {DB_NAME = Social-hiking,
    COLLECTION_NAME = hikes,
    DEFAULT_URI = "mongodb://localhost:27017"
    }
) {
    const connector = {};
    const URI = process.env.MONGODB_URI || DEFAULT_URI;


    connector.connect = () => {
        const client = new MongoClient(URI)
        const listings = client.db(DB_NAME).collection(COLLECTION_NAME);
        return {client, listings};
    }

    connector.getListings = async (query = {}){
        const {client,listings} = connector.connect();
        try {
            await listings.find(query).toArray();
        } catch (err){
            console.error("Error fetching records");
        } finally {
            client.close();
        }

        return listings;
    }

    return connector;
}