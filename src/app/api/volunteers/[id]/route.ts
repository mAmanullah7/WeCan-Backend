import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Volunteer from '@/models/Volunteer';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { isApproved } = await req.json();

    await connectToDatabase();

    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(volunteer);
  } catch (error) {
    console.error('Error updating volunteer:', error);
    return NextResponse.json(
      { error: 'Failed to update volunteer' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectToDatabase();

    const volunteer = await Volunteer.findByIdAndDelete(id);

    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    return NextResponse.json(
      { error: 'Failed to delete volunteer' },
      { status: 500 }
    );
  }
} 