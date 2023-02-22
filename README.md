# Awesome Project Build with TypeORM

Steps to run this project:

1. Tener instalado typescript,node y postgresql dentro del sistema a probar 
2. correr dentro del proyecto `yarn install` command
3. Configurar los ambientes en el archivo `.env`
   1. Solo modificar los siguientes enviroments:
      PGSQL_SECRET_DB,
      PGSQL_DATABASE,
      PGSQL_USERNAME,
      PGSQL_PASSWORD,
      PGSQL_SYNCHRONIZE,
      PGSQL_LOGGING,
      PGSQL_HOST,
      PGSQL_PORT
3. Correr las migraciones `yarn migration:ts`
4. Correr el ambiente de pruebas `yarn nodemon`
