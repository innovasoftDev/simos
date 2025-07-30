// src/app/api/backup/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

interface BackupData {
  metadata: {
    version: string;
    timestamp: string;
    database: string;
    tables: string[];
    recordCount: number;
  };
  data: {
    [tableName: string]: any[];
  };
}

export async function POST(request: NextRequest) {
  try {
    // Crear directorio de backups si no existe
    const backupDir = path.join(process.cwd(), 'backups');
    try {
      await fs.access(backupDir);
    } catch {
      await fs.mkdir(backupDir, { recursive: true });
    }

    // Definir el orden de exportación respetando las dependencias
    const exportOrder = [
      'TBL_USR_ROLES',
      'User',
      'Objeto',
      'Permiso',
      'Grup_Servidor',
      'Servidor',
      'Servicio',
      'Error_Servidor',
      'Error_Servicio',
      'Alerta_Servicio',
      'Exito_Servicio',
      'Bitacora'
    ];

    const backupData: BackupData = {
      metadata: {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        database: 'simos_db',
        tables: exportOrder,
        recordCount: 0
      },
      data: {}
    };

    let totalRecords = 0;

    // Exportar datos de cada tabla en el orden correcto
    for (const tableName of exportOrder) {
      console.log(`Exportando tabla: ${tableName}`);
      
      let tableData: any[] = [];
      
      switch (tableName) {
        case 'TBL_USR_ROLES':
          tableData = await prisma.tBL_USR_ROLES.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'User':
          tableData = await prisma.user.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Objeto':
          tableData = await prisma.objeto.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Permiso':
          tableData = await prisma.permiso.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Grup_Servidor':
          tableData = await prisma.grup_Servidor.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Servidor':
          tableData = await prisma.servidor.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Servicio':
          tableData = await prisma.servicio.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Error_Servidor':
          tableData = await prisma.error_Servidor.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Error_Servicio':
          tableData = await prisma.error_Servicio.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Alerta_Servicio':
          tableData = await prisma.alerta_Servicio.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Exito_Servicio':
          tableData = await prisma.exito_Servicio.findMany({
            orderBy: { created: 'asc' }
          });
          break;
        case 'Bitacora':
          tableData = await prisma.bitacora.findMany({
            orderBy: { fechaHora: 'asc' }
          });
          break;
      }

      backupData.data[tableName] = tableData;
      totalRecords += tableData.length;
      console.log(`Tabla ${tableName}: ${tableData.length} registros`);
    }

    backupData.metadata.recordCount = totalRecords;

    // Generar nombre del archivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup_simos_${timestamp}.json`;
    const filepath = path.join(backupDir, filename);

    // Guardar el backup
    await fs.writeFile(filepath, JSON.stringify(backupData, null, 2), 'utf8');

    // Registrar en bitácora
    await prisma.bitacora.create({
      data: {
        id_user: 'system',
        username: 'system',
        accion: 'CREAR_BACKUP',
        descripcion: `Backup creado: ${filename} con ${totalRecords} registros`,
        entidad: 'Sistema'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Backup creado exitosamente',
      data: {
        filename,
        filepath,
        recordCount: totalRecords,
        timestamp: backupData.metadata.timestamp,
        size: (await fs.stat(filepath)).size
      }
    });

  } catch (error) {
    console.error('Error creando backup:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al crear el backup',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}