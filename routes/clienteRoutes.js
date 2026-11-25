
import { Router } from 'express';

import {
    getClientes,
    getMaiorFaturamento,
    getClientePorNumero,
    getClientesPorCategoria,
    postCliente,
    putCliente,
    deleteCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/', getClientes);
router.get('/maior-faturamento', getMaiorFaturamento);
router.get('/categoria/:categoria', getClientesPorCategoria);
router.get('/:numerocli', getClientePorNumero);
router.post('/', postCliente);
router.put('/:numerocli', putCliente);
router.delete('/:numerocli', deleteCliente);

export default router;
