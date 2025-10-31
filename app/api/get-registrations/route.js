import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('event-registration');
    const collection = db.collection('registrations');

    const registrations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB ObjectId to string for JSON serialization
    const formattedRegistrations = registrations.map(reg => ({
      ...reg,
      _id: reg._id.toString(),
    }));

    return NextResponse.json(formattedRegistrations, { status: 200 });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations.' },
      { status: 500 }
    );
  }
}
