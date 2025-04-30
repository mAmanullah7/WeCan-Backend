import { NextResponse } from 'next/server';
import Event from '@/models/Event'; 
import { connectToDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !interest || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the Ananya event for the current year
    const currentYear = new Date().getFullYear();
    let event = await Event.findOne({ 
      title: { $regex: 'Ananya', $options: 'i' },
      year: currentYear 
    });

    if (!event) {
      // Create a new Ananya event if it doesn't exist
      event = await Event.create({
        title: `Ananya ${currentYear}`,
        description: 'Annual Techno-Cultural-Sports festival',
        date: new Date(currentYear, 8, 1), // September 1st of current year
        location: 'NIT Agartala Campus',
        year: currentYear,
        category: 'cultural',
        isActive: true,
        registrations: []
      });
    }

    // Add the registration to the event
    event.registrations.push({
      name,
      email,
      phone,
      interest,
      message,
      createdAt: new Date()
    });

    await event.save();

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your registration' },
      { status: 500 }
    );
  }
} 