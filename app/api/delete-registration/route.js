import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Force dynamic rendering - no static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    // Try to connect with timeout
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      )
    ]);

    const db = client.db('event-registration');
    const collection = db.collection('registrations');

    // Delete the registration
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log(`✅ Deleted registration with ID: ${id} at ${new Date().toISOString()}`);

    // Send response with no caching
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
    };

    return NextResponse.json(
      { success: true, message: 'Registration deleted successfully' },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('❌ Error deleting registration:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    return NextResponse.json(
      { 
        error: 'Failed to delete registration.',
        details: error.message
      },
      { status: 500 }
    );
  }
}

