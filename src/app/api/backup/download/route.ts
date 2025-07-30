// src/app/api/backup/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('filename');

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

    // Leer el archivo
    const fileBuffer = await fs.readFile(filepath);
    const stats = await fs.stat(filepath);

    // Registrar la descarga en bitácora
    await prisma.bitacora.create({
      data: {
        id_user: 'system',
        username: 'system',
        accion: 'DESCARGAR_BACKUP',
        descripcion: `Backup descargado: ${filename} (${stats.size} bytes)`,
        entidad: 'Sistema'
      }
    });

    // Configurar headers para descarga
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': stats.size.toString(),
    });

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error descargando backup:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al descargar el backup',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}