// src/app/api/backup/restore/route.ts
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
    const { filename, confirmRestore } = await request.json();

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

    // Leer y validar el archivo de backup
    const backupContent = await fs.readFile(filepath, 'utf8');
    let backupData: BackupData;
    
    try {
      backupData = JSON.parse(backupContent);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Archivo de backup corrupto o inválido'
      }, { status: 400 });
    }

    // Validar estructura del backup
    if (!backupData.metadata || !backupData.data) {
      return NextResponse.json({
        success: false,
        message: 'Estructura de backup inválida'
      }, { status: 400 });
    }

    // Si no hay confirmación, devolver información del backup para validación
    if (!confirmRestore) {
      return NextResponse.json({
        success: true,
        requiresConfirmation: true,
        backupInfo: {
          timestamp: backupData.metadata.timestamp,
          version: backupData.metadata.version,
          recordCount: backupData.metadata.recordCount,
          tables: backupData.metadata.tables,
          fileSize: (await fs.stat(filepath)).size
        }
      });
    }

    // Proceder con la restauración
    console.log('Iniciando restauración del backup...');

    // Orden para eliminar datos (inverso al de inserción)
    const deleteOrder = [
      'Bitacora',
      'Exito_Servicio',
      'Alerta_Servicio',
      'Error_Servicio',
      'Error_Servidor',
      'Servicio',
      'Servidor',
      'Grup_Servidor',
      'Permiso',
      'Objeto',
      'User',
      'TBL_USR_ROLES'
    ];

    // Orden para insertar datos
    const insertOrder = [
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

    await prisma.$transaction(async (tx) => {
      // 1. Eliminar todos los datos existentes
      console.log('Eliminando datos existentes...');
      for (const tableName of deleteOrder) {
        switch (tableName) {
          case 'TBL_USR_ROLES':
            await tx.tBL_USR_ROLES.deleteMany({});
            break;
          case 'User':
            await tx.user.deleteMany({});
            break;
          case 'Objeto':
            await tx.objeto.deleteMany({});
            break;
          case 'Permiso':
            await tx.permiso.deleteMany({});
            break;
          case 'Grup_Servidor':
            await tx.grup_Servidor.deleteMany({});
            break;
          case 'Servidor':
            await tx.servidor.deleteMany({});
            break;
          case 'Servicio':
            await tx.servicio.deleteMany({});
            break;
          case 'Error_Servidor':
            await tx.error_Servidor.deleteMany({});
            break;
          case 'Error_Servicio':
            await tx.error_Servicio.deleteMany({});
            break;
          case 'Alerta_Servicio':
            await tx.alerta_Servicio.deleteMany({});
            break;
          case 'Exito_Servicio':
            await tx.exito_Servicio.deleteMany({});
            break;
          case 'Bitacora':
            await tx.bitacora.deleteMany({});
            break;
        }
        console.log(`Tabla ${tableName} limpiada`);
      }

      // 2. Insertar los datos del backup
      console.log('Insertando datos del backup...');
      let totalInserted = 0;

      for (const tableName of insertOrder) {
        const tableData = backupData.data[tableName] || [];
        
        if (tableData.length > 0) {
          switch (tableName) {
            case 'TBL_USR_ROLES':
              await tx.tBL_USR_ROLES.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'User':
              await tx.user.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Objeto':
              await tx.objeto.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Permiso':
              await tx.permiso.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Grup_Servidor':
              await tx.grup_Servidor.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Servidor':
              await tx.servidor.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Servicio':
              await tx.servicio.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Error_Servidor':
              await tx.error_Servidor.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Error_Servicio':
              await tx.error_Servicio.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Alerta_Servicio':
              await tx.alerta_Servicio.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Exito_Servicio':
              await tx.exito_Servicio.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
            case 'Bitacora':
              await tx.bitacora.createMany({
                data: tableData,
                skipDuplicates: true
              });
              break;
          }
          totalInserted += tableData.length;
          console.log(`Tabla ${tableName}: ${tableData.length} registros insertados`);
        }
      }

      console.log(`Restauración completada: ${totalInserted} registros insertados`);
    });

    // Registrar la restauración en bitácora
    await prisma.bitacora.create({
      data: {
        id_user: 'system',
        username: 'system',
        accion: 'RESTAURAR_BACKUP',
        descripcion: `Backup restaurado: ${filename}`,
        entidad: 'Sistema'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Backup restaurado exitosamente',
      data: {
        filename,
        recordsRestored: backupData.metadata.recordCount,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error restaurando backup:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al restaurar el backup',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}