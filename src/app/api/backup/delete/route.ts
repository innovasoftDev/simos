// src/app/api/backup/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({
        success: false,
        message: 'Nombre de archivo requerido'
      }, { status: 400 });
    }

    const backupDir = path.join(process.cwd(), 'backups');
    const filepath = path.join(backupDir, filename);

    // Verificar que el archivo existe
    try {
      await fs.access(filepath);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Archivo de backup no encontrado'
      }, { status: 404 });
    }

    // Obtener información del archivo antes de eliminarlo
    const stats = await fs.stat(filepath);
    
    // Eliminar el archivo
    await fs.unlink(filepath);

    // Registrar la eliminación en bitácora
    await prisma.bitacora.create({
      data: {
        id_user: 'system',
        username: 'system',
        accion: 'ELIMINAR_BACKUP',
        descripcion: `Backup eliminado: ${filename} (${stats.size} bytes)`,
        entidad: 'Sistema'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Backup eliminado exitosamente',
      data: {
        filename,
        size: stats.size,
        deletedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error eliminando backup:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al eliminar el backup',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}