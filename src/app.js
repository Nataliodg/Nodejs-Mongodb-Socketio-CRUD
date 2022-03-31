import express from 'express';
//Importamos PATH para ubicar la carpeta public
import  path  from 'path';

const app = express();

//Servimos la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

export default app;