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

// Use caching but clear on errors
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      // Clear the promise on error so next request tries again
      global._mongoClientPromise = null;
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production: Clear on error to retry
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      // Clear the promise on error so next request tries again
      global._mongoClientPromise = null;
      console.error('MongoDB connection error in production:', err.message);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
