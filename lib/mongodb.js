import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://shubhamvishvkarma78:Shubham123@cluster0.xxy73ir.mongodb.net/event-registration?appName=Cluster0&retryWrites=true&w=majority';

const options = {
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 8000,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI');
}

// Use singleton pattern to reuse connection across requests
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect().catch(err => {
    // Clear the promise on error so next request tries again
    global._mongoClientPromise = null;
    console.error('MongoDB connection error:', err.message);
    throw err;
  });
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
