
import * as ClienteModel from '../models/clienteModel.js';

export const getClientes = (req, res) => {
    const clientes = ClienteModel.listarTodos();

    res.status(200).json(clientes);
};

export const getMaiorFaturamento = (req, res) => {
    const cliente = ClienteModel.buscarMaiorFaturamento();

    if (!cliente) {
        return res.status(404).json({
            mensagem: 'Nenhum cliente cadastrado.'
        });
    }

    res.status(200).json(cliente);
};

export const getClientePorNumero = (req, res) => {
    const numerocli = req.params.numerocli;
    const cliente = ClienteModel.buscarPorNumero(numerocli);

    if (cliente) {
        res.status(200).json(cliente);
    } else {
        res.status(404).json({
            mensagem: `Cliente não encontrado com o número ${numerocli}`
        });
    }
};

export const getClientesPorCategoria = (req, res) => {
    const categoria = req.params.categoria;
    const resultado = ClienteModel.buscarPorCategoria(categoria);

    if (resultado.length === 0) {
        return res.status(404).json({
            mensagem: `Nenhum cliente encontrado na categoria ${categoria}`
        });
    }

    res.status(200).json(resultado);
};

export const postCliente = (req, res) => {
    const { cliente, categoria, numerocli, faturamento } = req.body;

    if (!cliente || categoria === undefined || numerocli === undefined || faturamento === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }

    const novoCliente = ClienteModel.criar({
        cliente,
        categoria,
        numerocli,
        faturamento
    });

    res.status(201).json(novoCliente);
};

export const putCliente = (req, res) => {
    const { numerocli } = req.params;

    const clienteAtualizado = ClienteModel.atualizar(numerocli, req.body);

    if (!clienteAtualizado) {
        return res.status(404).json({
            mensagem: 'Cliente não encontrado'
        });
    }

    res.status(200).json(clienteAtualizado);
};

export const deleteCliente = (req, res) => {
    const { numerocli } = req.params;

    const clienteRemovido = ClienteModel.remover(numerocli);

    if (!clienteRemovido) {
        return res.status(404).json({
            mensagem: `Cliente não encontrado com o número ${numerocli}`
        });
    }

    res.status(200).json({
        mensagem: 'Cliente removido com sucesso',
        cliente: clienteRemovido
    });
};
