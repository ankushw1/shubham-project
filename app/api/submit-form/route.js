import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const formData = await request.json();

    const client = await clientPromise;
    const db = client.db('event-registration');
    const collection = db.collection('registrations');

    // Add timestamp
    const submissionData = {
      ...formData,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(submissionData);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
