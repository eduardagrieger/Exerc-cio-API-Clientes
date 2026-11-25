//Eduarda Grieger 

import express from 'express';
import { clientes } from './Clientes.js';


const app = express();
const port = 3000;


app.use(express.json());


app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);


});


app.get('/clientes/maior-faturamento', (req, res) => {
  if (clientes.length === 0) {
    return res.status(404).json({
      mensagem: 'Nenhum cliente cadastrado.'
    });
  }




  const maiorFaturamento = clientes.reduce((maior, cliente) => {
    if (cliente.faturamento > maior.faturamento) {
      maior = cliente;
    }
    return maior;
  }, clientes[0]);




  res.status(200).json(maiorFaturamento);
});


app.get('/clientes/:numerocli', (req, res) => {
  const numerocli = req.params.numerocli;
  const cliente = clientes.find(c => c.numerocli === numerocli);


  if (cliente) {
    res.status(200).json(cliente);
  } else {
    res.status(404).json({ mensagem:` Cliente não encontrado com o número ${numerocli}` });
  }
});


app.get('/clientes/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  const resultado = clientes.filter(p =>
    p.categoria.toLowerCase() === categoria.toLowerCase()
  );
  if (resultado.length === 0) {
    return res.status(404).json({
      mensagem: `Nenhum cliente encontrado na categoria ${categoria}`});
  }
  res.status(200).json(resultado);
});
app.put('/clientes/:numerocli', (req, res) => {
    const { numerocli } = req.params;
    const { cliente, categoria, faturamento } = req.body;

    const index = clientes.findIndex(c => c.numerocli === numerocli);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

   
    clientes[index] = {
        ...clientes[index],
        cliente: cliente ?? clientes[index].cliente,
        categoria: categoria ?? clientes[index].categoria,
        faturamento: faturamento ?? clientes[index].faturamento
    };

    res.status(200).json(clientes[index]);
});

app.post('/clientes', (req, res) => {
  const { cliente, categoria, numerocli, faturamento } = req.body;




  if (!cliente || categoria === undefined || numerocli === undefined || faturamento === undefined) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }
  const novoCliente = {
    cliente,
    categoria,
    numerocli: (numerocli),
    faturamento: parseFloat(faturamento)
  };

  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.delete('/clientes/:numerocli', (req, res) => {
  const { numerocli } = req.params;

  const index = clientes.findIndex(c => c.numerocli === numerocli);

  if (index === -1) {
    return res.status(404).json({
      mensagem: `Cliente não encontrado com o número ${numerocli}`
    });
  }

  const clienteRemovido = clientes.splice(index, 1)[0];

  res.status(200).json({
    mensagem: 'Cliente removido com sucesso',
    cliente: clienteRemovido
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Acessar http://localhost:${port}/clientes`);
});