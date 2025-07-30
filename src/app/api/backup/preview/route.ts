// src/app/api/backup/preview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

    // Leer y parsear el archivo
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

    // Validar estructura básica
    if (!backupData.metadata || !backupData.data) {
      return NextResponse.json({
        success: false,
        message: 'Estructura de backup inválida'
      }, { status: 400 });
    }

    // Generar estadísticas detalladas por tabla
    const tableStats: { [tableName: string]: { count: number; sample: any[] } } = {};
    
    for (const [tableName, tableData] of Object.entries(backupData.data)) {
      if (Array.isArray(tableData)) {
        // Tomar una muestra de los primeros 3 registros para preview
        const sample = tableData.slice(0, 3).map(record => {
          // Limitar el tamaño de cada campo para preview
          const limitedRecord: any = {};
          for (const [key, value] of Object.entries(record)) {
            if (typeof value === 'string' && value.length > 100) {
              limitedRecord[key] = value.substring(0, 100) + '...';
            } else {
              limitedRecord[key] = value;
            }
          }
          return limitedRecord;
        });

        tableStats[tableName] = {
          count: tableData.length,
          sample
        };
      }
    }

    // Obtener información del archivo
    const stats = await fs.stat(filepath);

    const previewData = {
      filename,
      fileInfo: {
        size: stats.size,
        created: stats.mtime.toISOString(),
        modified: stats.mtime.toISOString()
      },
      metadata: backupData.metadata,
      tableStats,
      summary: {
        totalTables: Object.keys(backupData.data).length,
        totalRecords: backupData.metadata.recordCount,
        fileSize: stats.size,
        isValid: true
      }
    };

    return NextResponse.json({
      success: true,
      message: 'Preview generado exitosamente',
      data: previewData
    });

  } catch (error) {
    console.error('Error generando preview:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al generar el preview',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}