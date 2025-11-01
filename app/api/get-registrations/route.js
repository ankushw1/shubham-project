import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Force dynamic rendering - no static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
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

    // Force a fresh query by adding timestamp
    const registrations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`✅ Fetched ${registrations.length} registrations at ${new Date().toISOString()}`);

    // Convert MongoDB ObjectId to string for JSON serialization
    const formattedRegistrations = registrations.map(reg => ({
      ...reg,
      _id: reg._id.toString(),
    }));

    // Send response with no caching
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
    };

    return NextResponse.json(formattedRegistrations, { 
      status: 200,
      headers,
    });
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
