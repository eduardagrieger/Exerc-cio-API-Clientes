
const clientes = [
    { cliente: "Joao da silva", categoria: "vip", numerocli: "C123", faturamento: 150000.00 },
    { cliente: "Vanessa Lopes", categoria: "ouro", numerocli: "C124", faturamento: 80000.00 },
    { cliente: "Auguzo Pinheiro", categoria: "bronze", numerocli: "C125", faturamento: 17000.00 },
    { cliente: "Poletto do Profundo", categoria: "diamante", numerocli: "C126", faturamento: 100000.00 },
    { cliente: "Tupiguarana", categoria: "bronze", numerocli: "C127", faturamento: 17000.00 }
];

export const listarTodos = () => {
    return clientes;
};

export const buscarPorNumero = (numerocli) => {
    return clientes.find(c => c.numerocli === numerocli);
};

export const buscarPorCategoria = (categoria) => {
    return clientes.filter(c =>
        c.categoria.toLowerCase() === categoria.toLowerCase()
    );
};

export const buscarMaiorFaturamento = () => {
    if (clientes.length === 0) return null;

    return clientes.reduce((maior, cliente) => {
        if (cliente.faturamento > maior.faturamento) {
            maior = cliente;
        }
        return maior;
    }, clientes[0]);
};

export const criar = ({ cliente, categoria, numerocli, faturamento }) => {
    const novoCliente = {
        cliente,
        categoria,
        numerocli,
        faturamento: parseFloat(faturamento)
    };

    clientes.push(novoCliente);
    return novoCliente;
};

export const atualizar = (numerocli, dados) => {
    const index = clientes.findIndex(c => c.numerocli === numerocli);

    if (index === -1) return null;

    clientes[index] = {
        ...clientes[index],
        cliente: dados.cliente ?? clientes[index].cliente,
        categoria: dados.categoria ?? clientes[index].categoria,
        faturamento: dados.faturamento ?? clientes[index].faturamento
    };

    return clientes[index];
};

export const remover = (numerocli) => {
    const index = clientes.findIndex(c => c.numerocli === numerocli);

    if (index === -1) return null;

    const clienteRemovido = clientes.splice(index, 1)[0];

    return clienteRemovido;
};
