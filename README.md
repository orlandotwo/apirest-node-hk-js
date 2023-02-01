# Apirest - Spotify
Esta Apirest se comunica con la api de Spotify con el fin de obtener un token para realizar busquedas de artistas y albumes de los mismos.

## Tecnologia Apirest
Para el desarrollo de esta Apirest utilice Node.js en Javascript.

## Requerimientos para utilizar Apirest
Para poder utilizar esta Apirest se debe:
-------------------------------------------
    1. Instalar localmente la base de datos MariaDB.
    2. Crear una base de datos local, se recomienda usar los mismos nombres que se usa en database/db-model.js
    3. Crear las siguientes tablas: 

    ```CREATE TABLE `access_token` (
        `name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
        `token` VARCHAR(2000) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
        `recorded_date` DATE NULL DEFAULT NULL,
        `expiration_time` INT(11) NULL DEFAULT NULL,
        `limit_time` DOUBLE NULL DEFAULT NULL
    )
    COLLATE='latin1_swedish_ci'
    ENGINE=InnoDB
    ;
    ```

    ```CREATE TABLE `requests` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `ip` VARCHAR(30) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
        `date` DATE NOT NULL,
        `artist_name` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
        PRIMARY KEY (`id`) USING BTREE
    )
    COLLATE='latin1_swedish_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=9
    ;
    ```

## Ejecicion de Apirest
Para poder ejecutarlo debemos introducir los siguientes comandos:
-----------------------------------------------------------------
    1. npm install
    2. node app