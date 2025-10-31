import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Try to connect with timeout
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      )
    ]);

    const db = client.db('event-registration');
    const collection = db.collection('registrations');

    // Add timestamp
    const submissionData = {
      ...formData,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(submissionData);

    console.log('✅ Form submitted successfully:', result.insertedId);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again.',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}
