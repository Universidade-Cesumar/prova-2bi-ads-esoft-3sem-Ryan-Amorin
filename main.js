'use strict';

const API_URL = 'https://6a289afc4e1e783349a5b4ab.mockapi.io/produtos';

let listaProdutos = [];

const limparTela = () => 
{
    document.getElementById('input-nome').value = '';
    document.getElementById('input-quantidade').value = '';
};

const renderizarLista = () => {
    const tbody = document.getElementById('corpo-tabela');
    tbody.innerHTML = '';

    listaProdutos.forEach((produto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
        `;
        tbody.appendChild(tr);
    });
};

const carregarProdutos = async () => 
{
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro ao carregar: ${response.status}`);

        listaProdutos = await response.json();
        renderizarLista();
    } catch (erro) {
        console.error('Falha no GET:', erro);
        alert('Não foi possível carregar os produtos.');
    }
};

const cadastrarProduto = async () => 
    {
    const nome = document.getElementById('input-nome').value.trim();
    const quantidade = document.getElementById('input-quantidade').value.trim();

    if (!nome || !quantidade) {
        alert('Preencha o nome e a quantidade antes de cadastrar.');
        return;
    }

    const novoProduto = { nome, quantidade: Number(quantidade) };

    try {
        const response = await fetch(API_URL, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) throw new Error(`Erro ao cadastrar: ${response.status}`);

        const produtoSalvo = await response.json();
        listaProdutos.push(produtoSalvo);
        renderizarLista();
        limparTela();
    } catch (erro) 
    {
        console.error('Falha no POST:', erro);
        alert('Não foi possível cadastrar o produto.');
    }
};

carregarProdutos();