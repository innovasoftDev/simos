// src/types/backup.ts

export interface BackupMetadata {
  version: string;
  timestamp: string;
  database: string;
  tables: string[];
  recordCount: number;
  hash?: string;
  description?: string;
}

export interface BackupData {
  metadata: BackupMetadata;
  data: {
    [tableName: string]: any[];
  };
}

export interface BackupFile {
  filename: string;
  filepath: string;
  size: number;
  created: string;
  isValid: boolean;
  metadata?: BackupMetadata;
}

export interface BackupOperation {
  id: string;
  type: 'create' | 'restore' | 'delete';
  status: 'pending' | 'running' | 'completed' | 'error';
  filename?: string;
  startTime: string;
  endTime?: string;
  error?: string;
  progress?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  requiresConfirmation?: boolean;
  backupInfo?: any;
}

export interface DatabaseStats {
  [tableName: string]: number;
  total: number;
}

export interface BackupValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface RestoreOptions {
  filename: string;
  confirmRestore: boolean;
  tables?: string[]; // Para restauraciones parciales (futuro)
  validateIntegrity?: boolean;
}