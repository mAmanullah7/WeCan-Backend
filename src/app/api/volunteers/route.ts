import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Volunteer from '@/models/Volunteer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Connect to database
    await connectToDatabase();
    
    // Check if volunteer with same email already exists
    const existingVolunteer = await Volunteer.findOne({ email: data.email });
    if (existingVolunteer) {
      return NextResponse.json(
        { error: 'A volunteer with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create new volunteer
    const volunteer = await Volunteer.create({
      ...data,
      isApproved: false
    });
    
    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    console.error('Error in volunteer registration:', error);
    return NextResponse.json(
      { error: 'Failed to process volunteer application' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    let query = {};
    if (!isAdmin) {
      query = { isApproved: true };
    }
    
    const volunteers = await Volunteer.find(query).sort({ createdAt: -1 });
    return NextResponse.json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    );
  }
} 