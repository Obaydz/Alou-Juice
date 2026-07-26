import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AdminModel } from '@/models/Schemas';
import { verifyAdminToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
  const currentAdmin = verifyAdminToken(req);
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { newUsername, newPassword, currentPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json({ error: 'Mot de passe actuel requis' }, { status: 400 });
    }

    if (!newUsername && !newPassword) {
      return NextResponse.json({ error: 'Veuillez fournir un nouveau nom d’utilisateur ou mot de passe' }, { status: 400 });
    }

    await dbConnect();

    // Find current admin
    const adminDoc = await AdminModel.findById((currentAdmin as any).id);
    if (!adminDoc) {
      return NextResponse.json({ error: 'Administrateur introuvable' }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, adminDoc.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 401 });
    }

    // Update username if provided
    if (newUsername && newUsername.trim() !== '') {
      // Check if username is already taken by another admin
      const existingUser = await AdminModel.findOne({ username: newUsername.trim(), _id: { $ne: adminDoc._id } });
      if (existingUser) {
        return NextResponse.json({ error: 'Ce nom d’utilisateur est déjà utilisé' }, { status: 400 });
      }
      adminDoc.username = newUsername.trim();
    }

    // Update password if provided
    if (newPassword && newPassword.trim() !== '') {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' }, { status: 400 });
      }
      const salt = await bcrypt.genSalt(10);
      adminDoc.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    await adminDoc.save();

    return NextResponse.json({ success: true, message: 'Identifiants mis à jour avec succès !' });
  } catch (error) {
    console.error('API Error /api/admin/profile:', error);
    return NextResponse.json({ error: 'Échec de la mise à jour des identifiants' }, { status: 500 });
  }
}
