
import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/clientes', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
