import express from 'express';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

//Connect to db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgCyan.white.bold('Conexión exitosa a la BD'));
  } catch (error) {
    // console.log(error);
    console.log(colors.bgRed.white('Hubo un error al conectar a la BD'));
  }
}
connectDB();
// Instancia de Express
const server = express();

// Leer datos del formulario
server.use(express.json());

server.use('/api/products', router);

// Docs

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
