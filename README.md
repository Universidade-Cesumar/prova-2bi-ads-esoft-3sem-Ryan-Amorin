[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B74p-HKt)

# 📦 Almoxarifado

## 📋 Descrição

Este projeto foi desenvolvido para otimizar o controle de materiais em um almoxarifado do setor de saúde, um ambiente onde a agilidade e a precisão são críticas. O sistema oferece uma solução clara para o gerenciamento de estoque, permitindo cadastrar, consultar, buscar, dar baixa e excluir itens, acompanhando em tempo real as quantidades disponíveis. A aplicação consome a **MockAPI** para realizar operações de CRUD, garantindo persistência de dados de forma ágil e demonstrando uma arquitetura simples e eficiente para o controle de materiais.

## ✨ Funcionalidades

- **Cadastro de material** — adiciona um novo item ao estoque, informando nome e quantidade.
- **Listagem de materiais** — carrega e exibe todos os itens cadastrados em uma tabela, consumindo a MockAPI.
- **Busca de material** — filtra a lista em tempo real conforme o nome digitado no campo de busca.
- **Baixa de estoque** — retira uma quantidade específica de um item, com validação para impedir retiradas inválidas (valores negativos, zero ou maiores que o estoque disponível).
- **Exclusão de material** — remove um item permanentemente do estoque.
- **Alerta de estoque crítico** — destaca visualmente as linhas da tabela cujos itens possuem quantidade inferior a 10 unidades.
- **Contador de itens** — exibe o total de itens listados (ou filtrados, durante uma busca).

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** 
- **Bootstrap Icons** 
- **MockAPI** 

## 📁 Estrutura do Projeto

```
├── index.html      # Estrutura da página
├── main.css        # Estilização da tabela e demais elementos
├── main.js         # Lógica da aplicação e integração com a MockAPI
└── README.md
```

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd <nome-da-pasta>
   ```
3. Abra o arquivo `index.html` diretamente no navegador **ou**, para evitar possíveis bloqueios de cache/CORS, utilize um servidor local, como a extensão **Live Server** do VS Code.