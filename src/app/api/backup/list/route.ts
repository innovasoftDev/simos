// src/app/api/backup/list/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface BackupFile {
  filename: string;
  filepath: string;
  size: number;
  created: string;
  isValid: boolean;
  metadata?: {
    version: string;
    timestamp: string;
    database: string;
    recordCount: number;
    tables: string[];
  };
}

export async function GET(request: NextRequest) {
  try {
    const backupDir = path.join(process.cwd(), 'backups');
    
    // Crear directorio si no existe
    try {
      await fs.access(backupDir);
    } catch {
      await fs.mkdir(backupDir, { recursive: true });
      return NextResponse.json({
        success: true,
        message: 'Directorio de backups creado',
        data: []
      });
    }

    // Leer archivos del directorio
    const files = await fs.readdir(backupDir);
    const backupFiles = files.filter(file => file.endsWith('.json') && file.startsWith('backup_'));

    const backupsInfo: BackupFile[] = [];

    for (const filename of backupFiles) {
      const filepath = path.join(backupDir, filename);
      
      try {
        const stats = await fs.stat(filepath);
        let isValid = false;
        let metadata: any = undefined;

        // Intentar leer metadata del backup
        try {
          const content = await fs.readFile(filepath, 'utf8');
          const backupData = JSON.parse(content);
          
          if (backupData.metadata && backupData.data) {
            isValid = true;
            metadata = backupData.metadata;
          }
        } catch {
          // Si no se puede leer o parsear, se marca como inválido
          isValid = false;
        }

        backupsInfo.push({
          filename,
          filepath,
          size: stats.size,
          created: stats.mtime.toISOString(),
          isValid,
          metadata
        });
      } catch (error) {
        console.error(`Error procesando archivo ${filename}:`, error);
      }
    }

    // Ordenar por fecha de creación (más reciente primero)
    backupsInfo.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    return NextResponse.json({
      success: true,
      message: `${backupsInfo.length} backups encontrados`,
      data: backupsInfo
    });

  } catch (error) {
    console.error('Error listando backups:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al listar los backups',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}