import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    // Try to connect with timeout
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      )
    ]);

    const db = client.db('event-registration');
    const collection = db.collection('registrations');

    const registrations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`✅ Fetched ${registrations.length} registrations`);

    // Convert MongoDB ObjectId to string for JSON serialization
    const formattedRegistrations = registrations.map(reg => ({
      ...reg,
      _id: reg._id.toString(),
    }));

    return NextResponse.json(formattedRegistrations, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching registrations:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    return NextResponse.json(
      { 
        error: 'Failed to fetch registrations.',
        details: error.message
      },
      { status: 500 }
    );
  }
}
