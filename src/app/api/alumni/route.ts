import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Alumni from '@/models/Alumni';
import { connectToDatabase } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const graduationYear = parseInt(formData.get('graduationYear') as string);
    const batch = formData.get('batch') as string;
    const position = formData.get('position') as string;
    const currentOrganization = formData.get('currentOrganization') as string;
    const bio = formData.get('bio') as string;
    const socialLinks = JSON.parse(formData.get('socialLinks') as string);
    const profilePicture = formData.get('profilePicture') as File;

    await connectToDatabase();

    // Check if alumni already exists
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return NextResponse.json({ error: 'Alumni already registered' }, { status: 400 });
    }

    let profilePicturePath = '/images/alumni/placeholder.jpg';
    
    // Handle profile picture upload
    if (profilePicture) {
      const bytes = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const timestamp = Date.now();
      const extension = profilePicture.name.split('.').pop();
      const filename = `${email.split('@')[0]}_${timestamp}.${extension}`;
      
      // Save file to public directory
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'alumni');
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      profilePicturePath = `/images/alumni/${filename}`;
    }

    // Create new alumni record
    const alumni = await Alumni.create({
      userId: session.user.id,
      name,
      email,
      graduationYear,
      batch,
      position,
      currentOrganization,
      bio,
      socialLinks,
      profilePicture: profilePicturePath,
      isApproved: false,
    });

    return NextResponse.json(alumni, { status: 201 });
  } catch (error) {
    console.error('Error in alumni registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';
    const approved = searchParams.get('approved');

    let query = { isApproved: true }; // Default to showing only approved alumni
    if (isAdmin && approved === 'false') {
      query = { isApproved: false }; // Show unapproved alumni only for admin
    }

    const alumni = await Alumni.find(query).sort({ createdAt: -1 });
    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, isApproved } = await req.json();
    await connectToDatabase();

    const alumni = await Alumni.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!alumni) {
      return NextResponse.json({ error: 'Alumni not found' }, { status: 404 });
    }

    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Error updating alumni status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 