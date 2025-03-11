-- DropIndex
DROP INDEX `SERVICIOS_Servidores_Id_Servidores_fkey` ON `servicios`;

-- DropIndex
DROP INDEX `SERVIDORES_tbl_grupo_servidores_Id_Grupo_Servidor_fkey` ON `servidores`;

-- DropIndex
DROP INDEX `TBL_GRUPO_SERVIDORES_user_id_user_fkey` ON `tbl_grupo_servidores`;

-- DropIndex
DROP INDEX `TBL_HIST_CONTRASENIA_user_id_user_fkey` ON `tbl_hist_contrasenia`;

-- DropIndex
DROP INDEX `TBL_PERMISOS_tbl_objetos_id_objeto_fkey` ON `tbl_permisos`;

-- DropIndex
DROP INDEX `TBL_PERMISOS_tbl_usr_roles_id_rol_fkey` ON `tbl_permisos`;

-- DropIndex
DROP INDEX `User_tbl_usr_roles_id_rol_fkey` ON `user`;

-- AlterTable
ALTER TABLE `tbl_permisos` ALTER COLUMN `fecha_modificacion` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tbl_usr_roles_id_rol_fkey` FOREIGN KEY (`tbl_usr_roles_id_rol`) REFERENCES `TBL_USR_ROLES`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_HIST_CONTRASENIA` ADD CONSTRAINT `TBL_HIST_CONTRASENIA_user_id_user_fkey` FOREIGN KEY (`user_id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_PERMISOS` ADD CONSTRAINT `TBL_PERMISOS_tbl_usr_roles_id_rol_fkey` FOREIGN KEY (`tbl_usr_roles_id_rol`) REFERENCES `TBL_USR_ROLES`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_PERMISOS` ADD CONSTRAINT `TBL_PERMISOS_tbl_objetos_id_objeto_fkey` FOREIGN KEY (`tbl_objetos_id_objeto`) REFERENCES `TBL_OBJETOS`(`id_objeto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_GRUPO_SERVIDORES` ADD CONSTRAINT `TBL_GRUPO_SERVIDORES_user_id_user_fkey` FOREIGN KEY (`user_id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SERVIDORES` ADD CONSTRAINT `SERVIDORES_tbl_grupo_servidores_Id_Grupo_Servidor_fkey` FOREIGN KEY (`tbl_grupo_servidores_Id_Grupo_Servidor`) REFERENCES `TBL_GRUPO_SERVIDORES`(`Id_Grupo_Servidor`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SERVICIOS` ADD CONSTRAINT `SERVICIOS_Servidores_Id_Servidores_fkey` FOREIGN KEY (`Servidores_Id_Servidores`) REFERENCES `SERVIDORES`(`Id_servidor`) ON DELETE CASCADE ON UPDATE CASCADE;
