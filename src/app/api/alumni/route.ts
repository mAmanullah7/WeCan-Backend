import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Alumni from '@/models/Alumni';
import { connectToDatabase } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface Session {
  user: SessionUser;
}

// Vercel Deployment Requirements:
// 1. Use environment variables for Cloudinary credentials
// 2. Do not write files to the local file system
// 3. All static assets must be in /public
// 4. Use serverless-friendly code (no fs/promises, no path for uploads)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;

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

    // Check if alumni already exists by email or userId (if logged in)
    let existingAlumni;
    if (session) {
      existingAlumni = await Alumni.findOne({
        $or: [
          { email },
          { userId: session.user.id }
        ]
      });
    } else {
      existingAlumni = await Alumni.findOne({ email });
    }

    if (existingAlumni) {
      if (existingAlumni.email === email) {
        return NextResponse.json({ error: 'This email is already registered as an alumni' }, { status: 400 });
      }
      if (session && existingAlumni.userId && existingAlumni.userId.toString() === session.user.id) {
        return NextResponse.json({ error: 'You have already registered as an alumni' }, { status: 400 });
      }
    }

    let profilePicturePath = '/images/alumni/placeholder.jpg';
    
    // Handle profile picture upload
    if (profilePicture) {
      const bytes = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Upload to Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'alumni',
            resource_type: 'image',
            public_id: email.split('@')[0] + '_' + Date.now(),
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });
      profilePicturePath = uploadResult.secure_url;
    }

    // Create new alumni record
    const alumniData: any = {
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
    };
    if (session) {
      alumniData.userId = session.user.id;
    }

    const alumni = await Alumni.create(alumniData);

    return NextResponse.json(alumni, { status: 201 });
  } catch (error: any) {
    console.error('Error in alumni registration:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'You have already registered as an alumni' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const session = await getServerSession(authOptions) as Session | null;
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
    const session = await getServerSession(authOptions) as Session | null;
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Alumni ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const alumni = await Alumni.findByIdAndDelete(id);

    if (!alumni) {
      return NextResponse.json({ error: 'Alumni not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Alumni deleted successfully' });
  } catch (error) {
    console.error('Error deleting alumni:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 