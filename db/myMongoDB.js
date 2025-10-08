import { MongoClient } from "mongodb";

function MyMongoDB({
  dbName = "sample_posts",
  collection_name = "posts",
  defaultUri = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  const URI = process.env.MONGODB_URI || defaultUri;

  const connect = () => {
    const client = new MongoClient(URI);
    const posts = client.db(dbName).collection(collection_name);

    return { client, posts };
  };

  me.getPosts = async ({ query = {}, pageSize = 20, page = 1 } = {}) => {
    const { client, posts } = connect();
    try {
      const data = await posts
        .find(query)
        .limit(pageSize)
        .skip(pageSize * page)
        .toArray();
      console.log("Fetched posts from MongoDB", data);
      return data;
    } catch (err) {
      console.error("Error fetching posts from MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  };
  return me;
}

const myMongoDB = MyMongoDB();
export default myMongoDB;
