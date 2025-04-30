import { NextResponse } from 'next/server';
import Event from '@/models/Event';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    await connectToDatabase();

    // Find the Ananya event for the current year
    const currentYear = new Date().getFullYear();
    const event = await Event.findOne({ 
      title: { $regex: 'Ananya', $options: 'i' },
      year: currentYear 
    });

    if (!event) {
      return NextResponse.json([], { status: 200 });
    }

    // Return the registrations sorted by creation date
    const registrations = event.registrations.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching Ananya registrations:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching registrations' },
      { status: 500 }
    );
  }
} 