var API_URL = 'https://6a289afc4e1e783349a5b4ab.mockapi.io/produtos';

var listaProdutos = [];

function validarRetirada(quantidadeEstoque, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > quantidadeEstoque) return false;
    return true;
}

function limparTela() {
    document.getElementById('input-nome').value = '';
    document.getElementById('input-quantidade').value = '';
}

function renderizarLista() {
    var tbody = document.getElementById('corpo-tabela');
    tbody.innerHTML = '';

    for (var i = 0; i < listaProdutos.length; i++) {
        var produto = listaProdutos[i];
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + (i + 1) + '</td>' +
                       '<td>' + produto.nome + '</td>' +
                       '<td>' + produto.quantidade + '</td>' +
                       '<td><input type="number" class="input-retirada" min="0" value="0">' +
'<button class="btn-baixar" data-id="' + produto.id + '" onclick="baixarProduto(\'' + produto.id + '\')"><i class="bi bi-box-arrow-down"></i> Baixar</button>' +
'<button class="btn-excluir" data-id="' + produto.id + '" onclick="excluirProduto(\'' + produto.id + '\')"><i class="bi bi-trash"></i> Excluir</button></td>';
        tbody.appendChild(tr);
    }
}

async function carregarProdutos() {
    try {
        var response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao carregar: ' + response.status);
        listaProdutos = await response.json();
        renderizarLista();
    } catch (erro) {
        console.error('Falha no GET:', erro);
        alert('Não foi possível carregar os produtos.');
    }
}

async function cadastrarProduto() {
    var nome = document.getElementById('input-nome').value.trim();
    var quantidade = document.getElementById('input-quantidade').value.trim();

    if (!nome || !quantidade) {
        alert('Preencha o nome e a quantidade antes de cadastrar.');
        return;
    }

    var novoProduto = { nome: nome, quantidade: parseInt(quantidade) };

    try {
        var response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) throw new Error('Erro ao cadastrar: ' + response.status);

        var produtoSalvo = await response.json();
        listaProdutos.push(produtoSalvo);
        renderizarLista();
        limparTela();
    } catch (erro) {
        console.error('Falha no POST:', erro);
        alert('Não foi possível cadastrar o produto.');
    }
}

async function baixarProduto(id) 
{
    var botao = document.querySelector('.btn-baixar[data-id="' + id + '"]');
    var input = botao.parentNode.querySelector('.input-retirada');
    var qtd = parseInt(input.value);

    var produto = null;
    for (var i = 0; i < listaProdutos.length; i++) {
        if (listaProdutos[i].id === id) {
            produto = listaProdutos[i];
            break;
        }
    }
    if (!produto) return;

    if (!validarRetirada(produto.quantidade, qtd)) {
        alert('Quantidade inválida para retirada.');
        return;
    }

    try {
        var novaQtd = produto.quantidade - qtd;
        var response = await fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: novaQtd })
        });

        if (!response.ok) throw new Error('Erro na baixa: ' + response.status);

        produto.quantidade = novaQtd;
        renderizarLista();
    } catch (erro) {
        console.error('Falha no PUT:', erro);
        alert('Não foi possível dar baixa no produto.');
    }
}

async function excluirProduto(id) 
{
    try 
    {
        var response = await fetch(API_URL + '/' + id, {
            method: 'DELETE'
    });

        if (!response.ok) throw new Error('Erro ao excluir: ' + response.status);

        var novaLista = [];
        for (var i = 0; i < listaProdutos.length; i++) 
            {
            if (listaProdutos[i].id !== id) 
                {
                novaLista.push(listaProdutos[i]);
            }
        }
        listaProdutos = novaLista;
        renderizarLista();
    } catch (erro) {
        console.error('Falha no DELETE:', erro);
        alert('Não foi possível excluir o produto.');
    }
}

carregarProdutos();