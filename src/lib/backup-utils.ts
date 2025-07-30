// src/lib/backup-utils.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface BackupMetadata {
  version: string;
  timestamp: string;
  database: string;
  tables: string[];
  recordCount: number;
}

export interface BackupData {
  metadata: BackupMetadata;
  data: {
    [tableName: string]: any[];
  };
}

// Orden de las tablas para exportación/importación
export const TABLE_EXPORT_ORDER = [
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

// Orden inverso para eliminación
export const TABLE_DELETE_ORDER = [...TABLE_EXPORT_ORDER].reverse();

/**
 * Valida la estructura de un archivo de backup
 */
export function validateBackupStructure(backupData: any): boolean {
  try {
    // Verificar que tenga metadata y data
    if (!backupData.metadata || !backupData.data) {
      return false;
    }

    // Verificar metadata requerida
    const requiredMetadataFields = ['version', 'timestamp', 'database', 'tables', 'recordCount'];
    for (const field of requiredMetadataFields) {
      if (!(field in backupData.metadata)) {
        return false;
      }
    }

    // Verificar que data sea un objeto
    if (typeof backupData.data !== 'object') {
      return false;
    }

    // Verificar que las tablas en metadata existan en data
    for (const tableName of backupData.metadata.tables) {
      if (!(tableName in backupData.data)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene estadísticas de una tabla específica
 */
export async function getTableStats(tableName: string): Promise<number> {
  try {
    switch (tableName) {
      case 'TBL_USR_ROLES':
        return await prisma.tBL_USR_ROLES.count();
      case 'User':
        return await prisma.user.count();
      case 'Objeto':
        return await prisma.objeto.count();
      case 'Permiso':
        return await prisma.permiso.count();
      case 'Grup_Servidor':
        return await prisma.grup_Servidor.count();
      case 'Servidor':
        return await prisma.servidor.count();
      case 'Servicio':
        return await prisma.servicio.count();
      case 'Error_Servidor':
        return await prisma.error_Servidor.count();
      case 'Error_Servicio':
        return await prisma.error_Servicio.count();
      case 'Alerta_Servicio':
        return await prisma.alerta_Servicio.count();
      case 'Exito_Servicio':
        return await prisma.exito_Servicio.count();
      case 'Bitacora':
        return await prisma.bitacora.count();
      default:
        return 0;
    }
  } catch (error) {
    console.error(`Error obteniendo estadísticas de ${tableName}:`, error);
    return 0;
  }
}

/**
 * Obtiene estadísticas completas de la base de datos
 */
export async function getDatabaseStats(): Promise<{[tableName: string]: number}> {
  const stats: {[tableName: string]: number} = {};
  
  for (const tableName of TABLE_EXPORT_ORDER) {
    stats[tableName] = await getTableStats(tableName);
  }
  
  return stats;
}

/**
 * Verifica la integridad de las relaciones en un backup
 */
export function validateBackupIntegrity(backupData: BackupData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  try {
    const data = backupData.data;
    
    // Verificar relaciones User -> TBL_USR_ROLES
    if (data.User && data.TBL_USR_ROLES) {
      const roleIds = new Set(data.TBL_USR_ROLES.map((role: any) => role.id_rol));
      for (const user of data.User) {
        if (!roleIds.has(user.tbl_usr_roles_id_rol)) {
          errors.push(`Usuario ${user.username} referencia rol inexistente: ${user.tbl_usr_roles_id_rol}`);
        }
      }
    }
    
    // Verificar relaciones Permiso -> Objeto y TBL_USR_ROLES
    if (data.Permiso && data.Objeto && data.TBL_USR_ROLES) {
      const objetoIds = new Set(data.Objeto.map((obj: any) => obj.Id_Objeto));
      const roleIds = new Set(data.TBL_USR_ROLES.map((role: any) => role.id_rol));
      
      for (const permiso of data.Permiso) {
        if (!objetoIds.has(permiso.ObjetoId)) {
          errors.push(`Permiso ${permiso.Id_Permiso} referencia objeto inexistente: ${permiso.ObjetoId}`);
        }
        if (!roleIds.has(permiso.TBL_USR_ROLESId)) {
          errors.push(`Permiso ${permiso.Id_Permiso} referencia rol inexistente: ${permiso.TBL_USR_ROLESId}`);
        }
      }
    }
    
    // Verificar relaciones Servidor -> Grup_Servidor
    if (data.Servidor && data.Grup_Servidor) {
      const grupoIds = new Set(data.Grup_Servidor.map((grupo: any) => grupo.Id_Grup_Servidor));
      for (const servidor of data.Servidor) {
        if (!grupoIds.has(servidor.Grup_ServidorId)) {
          errors.push(`Servidor ${servidor.Nombre_Servidor} referencia grupo inexistente: ${servidor.Grup_ServidorId}`);
        }
      }
    }
    
    // Verificar relaciones Servicio -> Servidor
    if (data.Servicio && data.Servidor) {
      const servidorIds = new Set(data.Servidor.map((servidor: any) => servidor.Id_Servidor));
      for (const servicio of data.Servicio) {
        if (!servidorIds.has(servicio.ServidorId)) {
          errors.push(`Servicio ${servicio.Nombre_Servicio} referencia servidor inexistente: ${servicio.ServidorId}`);
        }
      }
    }
    
    // Verificar relaciones de errores con servidores
    if (data.Error_Servidor && data.Servidor) {
      const servidorIds = new Set(data.Servidor.map((servidor: any) => servidor.Id_Servidor));
      for (const error of data.Error_Servidor) {
        if (!servidorIds.has(error.ServidorId)) {
          errors.push(`Error de servidor ${error.Codigo_Error} referencia servidor inexistente: ${error.ServidorId}`);
        }
      }
    }
    
    // Verificar relaciones de errores/alertas/éxitos con servicios
    if (data.Servicio) {
      const servicioIds = new Set(data.Servicio.map((servicio: any) => servicio.Id_Servicio));
      
      ['Error_Servicio', 'Alerta_Servicio', 'Exito_Servicio'].forEach(tableName => {
        if (data[tableName]) {
          for (const item of data[tableName]) {
            if (!servicioIds.has(item.ServicioId)) {
              errors.push(`${tableName} referencia servicio inexistente: ${item.ServicioId}`);
            }
          }
        }
      });
    }
    
  } catch (error) {
    errors.push(`Error validando integridad: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Genera un nombre de archivo único para el backup
 */
export function generateBackupFilename(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `backup_simos_${timestamp}.json`;
}

/**
 * Calcula el hash de un backup para verificación de integridad
 */
export function calculateBackupHash(backupData: BackupData): string {
  const crypto = require('crypto');
  const dataString = JSON.stringify(backupData.data);
  return crypto.createHash('md5').update(dataString).digest('hex');
}