# 🌱 Desperdício Zero — Radar de Perdas

## 📌 Sobre o Projeto

O **Desperdício Zero — Radar de Perdas** é uma aplicação web desenvolvida para auxiliar supermercados, mercearias e outros estabelecimentos comerciais no gerenciamento de estoque, monitoramento da validade de produtos e prevenção de perdas.

O sistema permite acompanhar produtos e lotes, identificar mercadorias próximas do vencimento, registrar movimentações de estoque e planejar ações preventivas.

Este projeto foi desenvolvido como trabalho final do curso de **Desenvolvimento Web Full Stack da Toti Educação**.

## 🎯 Objetivo

Desenvolver uma solução digital que contribua para uma gestão de estoque mais eficiente, econômica e sustentável, facilitando a identificação antecipada de produtos em risco de vencimento.

## ❗ Problema Identificado

Estabelecimentos comerciais podem sofrer prejuízos financeiros devido ao vencimento de produtos, à falta de acompanhamento dos lotes e à identificação tardia de mercadorias em risco.

## 💡 Solução Proposta

O Desperdício Zero centraliza informações sobre categorias, produtos, lotes, movimentações de estoque e ações preventivas.

A aplicação disponibiliza indicadores e classificações de risco para apoiar decisões que contribuam para a redução do desperdício.

## ⚙️ Funcionalidades

### Categorias
- Cadastrar, consultar, editar e excluir categorias.
- Associar produtos às categorias.
- Impedir a exclusão de categorias que possuem produtos associados.

### Produtos
- Cadastrar, consultar, editar e excluir produtos.
- Associar produtos às categorias.
- Visualizar detalhes, lotes e histórico de operações.
- Impedir a exclusão de produtos que possuem lotes associados.

### Lotes
- Cadastrar, consultar, editar e excluir lotes.
- Registrar quantidade inicial, quantidade disponível, custo unitário, data de entrada e data de validade.
- Identificar lotes próximos do vencimento.
- Impedir exclusões quando existem movimentações ou ações preventivas associadas.

### Movimentações de Estoque
- Registrar entradas, vendas, descartes e ajustes de estoque.
- Consultar, editar e excluir movimentações.
- Atualizar automaticamente a quantidade disponível nos lotes.
- Impedir saídas superiores à quantidade disponível.
- Impedir movimentações com datas futuras.

### Ações Preventivas
- Cadastrar, consultar, editar e excluir ações preventivas.
- Associar ações aos lotes.
- Informar quantidade afetada, data planejada e observações.
- Acompanhar os status: planejada, concluída e cancelada.
- Registrar a realização de ações concluídas.
- Impedir o planejamento de ações preventivas com datas anteriores à data atual.
- Registrar automaticamente a data de realização quando uma ação é marcada como concluída.

### Painel e Indicadores

O sistema disponibiliza um painel com indicadores operacionais e financeiros, atualizados conforme as alterações realizadas no estoque.

- **Total de produtos cadastrados:** quantidade de produtos registrados no sistema.
- **Produtos em risco:** produtos que possuem pelo menos um lote com estoque disponível e classificação de risco alto.
- **Lotes próximos do vencimento:** quantidade de lotes com estoque disponível classificados com risco alto ou médio.
- **Ações preventivas planejadas:** quantidade de ações preventivas com status `PLANEJADA`.
- **Valor financeiro em risco:** estimativa do valor dos produtos disponíveis em lotes classificados com risco alto ou médio, calculada a partir da quantidade disponível e do custo unitário.
- **Perdas estimadas por descarte:** valor estimado dos produtos descartados, calculado a partir das quantidades descartadas e dos custos unitários dos respectivos lotes.

Os indicadores financeiros possuem identificação visual para facilitar sua interpretação:

- **Amarelo-âmbar:** representa valores financeiros em risco de perda.
- **Vermelho:** representa perdas estimadas por descarte.
- **Verde:** representa o estado padrão quando não existem valores financeiros em risco ou perdas registradas.

Os indicadores são recalculados automaticamente após as operações de estoque, sem necessidade de atualizar manualmente a página.

### Classificação de Risco

Os lotes são classificados conforme o tempo restante até o vencimento:

| Nível | Critério |
|---|---|
| 🔴 Alto | Até 3 dias para o vencimento |
| 🟡 Médio | De 4 a 7 dias |
| 🟢 Baixo | Mais de 7 dias |

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express
- Sequelize

### Banco de Dados
- SQLite

### Ferramentas
- Visual Studio Code
- Git e GitHub
- Postman

## 📁 Estrutura do Projeto

```text
desperdicio-zero/
├── frontend/
│   └── react-app/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── App.jsx
│       │   └── App.css
│       └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
└── README.md
```

O frontend é responsável pela interface visual e pela interação com o usuário.

O backend disponibiliza uma API REST, implementa as regras de negócio e realiza a comunicação com o banco de dados SQLite.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js e npm instalados.
- Código-fonte do projeto disponível no computador.

### 1. Executar o Backend

Abra um terminal na pasta principal do projeto:

```bash
cd backend
npm install
npm run dev
```

O servidor utiliza a porta `3000`.

### 2. Executar o Frontend

Abra outro terminal na pasta principal do projeto:

```bash
cd frontend/react-app
npm install
npm run dev
```

Acesse o endereço informado pelo Vite no terminal, normalmente:

http://localhost:5173

**Importante:** mantenha o backend e o frontend em execução simultaneamente para utilizar a aplicação.

## 🔗 API REST

A aplicação utiliza os seguintes endpoints principais:

| Recurso | Endpoint |
|---|---|
| Categorias | `/categorias` |
| Produtos | `/produtos` |
| Lotes | `/lotes` |
| Ações preventivas | `/acoes-preventivas` |
| Movimentações de estoque | `/movimentacao-estoque` |

A API permite operações de criação, consulta, atualização e exclusão, respeitando as validações e regras de negócio implementadas.

## 🔮 Melhorias Futuras

- Implementar autenticação e controle de acesso.
- Adicionar relatórios detalhados de perdas.
- Ampliar os recursos de alertas de vencimento.
- Implementar filtros e pesquisas avançadas.
- Disponibilizar a aplicação em ambiente de produção.

## 👩‍💻 Equipe de Desenvolvimento

- Lennis Castillo
- Jhoel González

## 🎓 Formação

Projeto final do curso de **Desenvolvimento Web Full Stack — Toti Educação**.

## 🌍 Impacto Esperado

O Desperdício Zero demonstra como a tecnologia pode apoiar a redução de perdas financeiras, melhorar o aproveitamento de produtos e contribuir para a sustentabilidade no comércio.

**Desperdício Zero — Menos perdas, mais eficiência e sustentabilidade.**