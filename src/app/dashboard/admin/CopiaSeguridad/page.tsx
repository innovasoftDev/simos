// src/app/dashboard/admin/CopiaSeguridad/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Database, 
  Calendar, 
  HardDrive,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  Eye,
  FileDown
} from 'lucide-react';

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

interface BackupPreview {
  filename: string;
  fileInfo: {
    size: number;
    created: string;
    modified: string;
  };
  metadata: {
    version: string;
    timestamp: string;
    database: string;
    tables: string[];
    recordCount: number;
  };
  tableStats: {
    [tableName: string]: {
      count: number;
      sample: any[];
    };
  };
  summary: {
    totalTables: number;
    totalRecords: number;
    fileSize: number;
    isValid: boolean;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  requiresConfirmation?: boolean;
  backupInfo?: any;
}

export default function CopiaSeguridad() {
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [showRestoreDialog, setShowRestoreDialog] = useState<{filename: string; info?: any} | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState<BackupPreview | null>(null);
  const [operationInProgress, setOperationInProgress] = useState<'backup' | 'restore' | 'delete' | 'preview' | 'download' | null>(null);

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/backup/list');
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setBackups(result.data || []);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar la lista de backups' });
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    try {
      setOperationInProgress('backup');
      setMessage({ type: 'info', text: 'Creando backup, esto puede tomar varios minutos...' });
      
      const response = await fetch('/api/backup/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Backup creado exitosamente: ${result.data?.recordCount} registros guardados` 
        });
        loadBackups(); // Recargar la lista
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al crear el backup' });
    } finally {
      setOperationInProgress(null);
    }
  };

  const handleRestoreClick = async (filename: string) => {
    try {
      const response = await fetch('/api/backup/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, confirmRestore: false }),
      });
      
      const result: ApiResponse = await response.json();
      
      if (result.success && result.requiresConfirmation) {
        setShowRestoreDialog({ filename, info: result.backupInfo });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al validar el backup' });
    }
  };

  const confirmRestore = async () => {
    if (!showRestoreDialog) return;
    
    try {
      setOperationInProgress('restore');
      setShowRestoreDialog(null);
      setMessage({ type: 'info', text: 'Restaurando backup, esto puede tomar varios minutos...' });
      
      const response = await fetch('/api/backup/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          filename: showRestoreDialog.filename, 
          confirmRestore: true 
        }),
      });
      
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Backup restaurado exitosamente: ${result.data?.recordsRestored} registros` 
        });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al restaurar el backup' });
    } finally {
      setOperationInProgress(null);
    }
  };

  const deleteBackup = async (filename: string) => {
    try {
      setOperationInProgress('delete');
      setShowDeleteDialog(null);
      
      const response = await fetch('/api/backup/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });
      
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Backup eliminado exitosamente' });
        loadBackups(); // Recargar la lista
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el backup' });
    } finally {
      setOperationInProgress(null);
    }
  };

  const downloadBackup = async (filename: string) => {
    try {
      setOperationInProgress('download');
      setMessage({ type: 'info', text: 'Descargando archivo...' });
      
      const response = await fetch(`/api/backup/download?filename=${encodeURIComponent(filename)}`);
      
      if (response.ok) {
        // Crear blob y descargar
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setMessage({ type: 'success', text: 'Archivo descargado exitosamente' });
      } else {
        const result = await response.json();
        setMessage({ type: 'error', text: result.message || 'Error al descargar el archivo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al descargar el backup' });
    } finally {
      setOperationInProgress(null);
    }
  };

  const previewBackup = async (filename: string) => {
    try {
      setOperationInProgress('preview');
      setMessage({ type: 'info', text: 'Generando vista previa...' });
      
      const response = await fetch(`/api/backup/preview?filename=${encodeURIComponent(filename)}`);
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setShowPreviewDialog(result.data);
        setMessage(null);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al generar la vista previa' });
    } finally {
      setOperationInProgress(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Sistema de Copias de Seguridad</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestiona las copias de seguridad de la base de datos del sistema SIMOS
        </p>
      </div>

      {/* Mensajes de estado */}
      {message && (
        <Alert className={`mb-6 ${
          message.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400' :
          message.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' :
          'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
        }`}>
          {message.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
          {message.type === 'error' && <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
          {message.type === 'info' && <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          <AlertDescription className={
            message.type === 'success' ? 'text-green-800 dark:text-green-200' :
            message.type === 'error' ? 'text-red-800 dark:text-red-200' :
            'text-blue-800 dark:text-blue-200'
          }>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Acciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Crear Backup
            </CardTitle>
            <CardDescription>
              Genera una copia de seguridad completa de todos los datos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createBackup} 
              disabled={operationInProgress !== null}
              className="w-full"
            >
              {operationInProgress === 'backup' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando Backup...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Crear Backup
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Actualizar Lista
            </CardTitle>
            <CardDescription>
              Recargar la lista de backups disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={loadBackups} 
              variant="outline" 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar Lista
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de backups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Historial de Backups ({backups.length})
          </CardTitle>
          <CardDescription>
            Lista de todas las copias de seguridad disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay backups disponibles</p>
              <p className="text-sm">Crea tu primer backup para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {backups.map((backup) => (
                <div
                  key={backup.filename}
                  className="border rounded-lg p-4 hover:bg-[#e0e7ff] dark:hover:bg-[#070c22] hover:text-black dark:hover:text-white transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-lg">{backup.filename}</h3>
                        <Badge variant={backup.isValid ? "default" : "destructive"}>
                          {backup.isValid ? "Válido" : "Corrupto"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(backup.created)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4" />
                          <span>{formatFileSize(backup.size)}</span>
                        </div>
                        
                        {backup.metadata && (
                          <>
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              <span>{backup.metadata.recordCount} registros</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                                v{backup.metadata.version}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {backup.metadata && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Tablas: {backup.metadata.tables.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => previewBackup(backup.filename)}
                        disabled={!backup.isValid || operationInProgress !== null}
                        title="Vista previa"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadBackup(backup.filename)}
                        disabled={!backup.isValid || operationInProgress !== null}
                        title="Descargar archivo"
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestoreClick(backup.filename)}
                        disabled={!backup.isValid || operationInProgress !== null}
                        title="Restaurar backup"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowDeleteDialog(backup.filename)}
                        disabled={operationInProgress !== null}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
                        title="Eliminar backup"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={showDeleteDialog !== null} onOpenChange={() => setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El archivo de backup será eliminado permanentemente.
              <br />
              <br />
              <strong>Archivo:</strong> {showDeleteDialog}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteDialog && deleteBackup(showDeleteDialog)}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de confirmación para restaurar */}
      <AlertDialog open={showRestoreDialog !== null} onOpenChange={() => setShowRestoreDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Restaurar Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  ⚠️ ADVERTENCIA: Esta acción eliminará TODOS los datos actuales y los reemplazará con los datos del backup.
                </p>
                <p>Esta acción no se puede deshacer.</p>
                
                {showRestoreDialog?.info && (
                  <div className="mt-4 p-3 hover:bg-[#e0e7ff] dark:hover:bg-[#070c22] hover:text-black dark:hover:text-white text-sm">
                    <p><strong>Archivo:</strong> {showRestoreDialog.filename}</p>
                    <p><strong>Fecha:</strong> {formatDate(showRestoreDialog.info.timestamp)}</p>
                    <p><strong>Registros:</strong> {showRestoreDialog.info.recordCount}</p>
                    <p><strong>Tamaño:</strong> {formatFileSize(showRestoreDialog.info.fileSize)}</p>
                    <p><strong>Versión:</strong> {showRestoreDialog.info.version}</p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRestore}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Sí, Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de vista previa */}
      <AlertDialog open={showPreviewDialog !== null} onOpenChange={() => setShowPreviewDialog(null)}>
        <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Vista Previa del Backup
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showPreviewDialog && (
                <div className="space-y-4">
                  {/* Información general */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Archivo:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{showPreviewDialog.filename}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Fecha:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(showPreviewDialog.metadata.timestamp)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tamaño:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(showPreviewDialog.summary.fileSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Registros:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{showPreviewDialog.summary.totalRecords}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Versión:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{showPreviewDialog.metadata.version}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Base de Datos:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{showPreviewDialog.metadata.database}</p>
                    </div>
                  </div>

                  {/* Estadísticas por tabla */}
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Contenido por Tabla:</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {Object.entries(showPreviewDialog.tableStats).map(([tableName, stats]) => (
                        <div key={tableName} className="border rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-gray-800 dark:text-gray-200">{tableName}</h5>
                            <Badge variant="secondary">{stats.count} registros</Badge>
                          </div>
                          
                          {stats.sample.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                Muestra de datos (primeros {stats.sample.length} registros):
                              </p>
                              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto">
                                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                                  {JSON.stringify(stats.sample, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            {showPreviewDialog && (
              <AlertDialogAction
                onClick={() => downloadBackup(showPreviewDialog.filename)}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Descargar
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}