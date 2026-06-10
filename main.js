'use strict';


const LimparTela = () => 
{
    document.getElementById("input-nome").value = "";
    document.getElementById("input-quantidade").value = "";  
};

const MostrarTabela = (lista_materiais) =>
    {
    const corpo_tabela = document.getElementById("corpo-tabela");
    corpo_tabela.innerHTML = '';
    
    const itens = Array.isArray(lista_materiais) ? lista_materiais : [lista_materiais];
    
    itens.forEach((item) =>
        {
            const tr = document.createElement("tr");
            
            const td_id = document.createElement("td");
            td_id.textContent = item.id;
            tr.appendChild(td_id);
            
            const td_produto = document.createElement("td");
            td_produto.textContent = item.nome;
            tr.appendChild(td_produto);
            
            const td_quantidade = document.createElement("td");
            td_quantidade.textContent = item.quantidade;
            tr.appendChild(td_quantidade);
            
            corpo_tabela.appendChild(tr);
        });
    };
   