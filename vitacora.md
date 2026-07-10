
# Título 1 (H1)
## Título 2 (H2)
### Título 3 (H3)
#### Título 4 (H4)


*Texto en cursiva* o _Texto en cursiva_
**Texto en negrita** o __Texto en negrita__
***Negrita y cursiva***
~~Texto tachado~~

# Configuracion del entorno

## Creamos el proyecto 
  1. Creamos el proyecto
    `npx create-next-app@latest`
    
  2. Incializamos prisma
    `npx prisma init`
    genera archivo prisma.config, .env, carpeta prisma/schema.prisma

  3. Instalamos prisma client
    `npm install @prisma/client`
    Instala la libreria que usara la aplicacion para consultar la base de datos

  4. Instalamos Prisma CLI
    `npm install -D prisma`
    Instala la herramienta de línea de comandos de Prisma (CLI), que permite ejecutar comandos como:
    npx prisma migrate dev
    npx prisma generate
    npx prisma db pull
    npx prisma studio


Instalamos el adaptador oficial de Prisma para PostgreSQL
Su función es permitir que PrismaClient se conecte a una base de datos PostgreSQL.
`npm install@prisma/adapter-pg`





