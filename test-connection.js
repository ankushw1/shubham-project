const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shubhamvishvkarma78:Shubham123@cluster0.xxy73ir.mongodb.net/event-registration?appName=Cluster0&retryWrites=true&w=majority';

async function testConnection() {
  let client;
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    client = new MongoClient(uri, {
      // TEMP: relax TLS for debugging only
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 8000,
    });
    await client.connect();
    console.log('✅ MongoDB connection successful!');
    
    // Test database and collection
    const db = client.db('event-registration');
    const collections = await db.listCollections().toArray();
    console.log('📊 Database: event-registration');
    console.log('📁 Collections:', collections.map(c => c.name));
    
    // Try to access registrations collection
    const collection = db.collection('registrations');
    const count = await collection.countDocuments();
    console.log(`📝 Total registrations: ${count}`);
    
    console.log('✅ All tests passed! Connection is working perfectly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error details:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔒 Connection closed.');
    }
  }
}

testConnection();
