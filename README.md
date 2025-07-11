# 📚 Study Smart

Aplicação web para criação, organização e gerenciamento de decks de estudos com cards personalizados.

## ✨ Funcionalidades

✅ **Gerenciamento de Decks**  
- Criar novos decks com título, descrição e imagem (upload).  
- Editar informações dos decks existentes.  
- Excluir decks.  
- Visualizar todos os decks em uma grade responsiva com imagem de capa.

✅ **Gerenciamento de Cards**  
- Visualizar cards associados a cada deck.
- Criar novos cards informando frente e verso.
- Editar cards existentes.
- Excluir cards.

✅ **Dark Mode**  
- Interface totalmente compatível com tema escuro.

✅ **Design Responsivo**  
- Interfaces adaptadas para desktop e mobile.

---

## 🚀 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router](https://router.vuejs.org/) para gerenciamento de rotas
- Tailwind CSS para estilização (com classes personalizadas)

---

## 🧭 Estrutura de Telas

### 🏠 Home
Página inicial que lista todos os decks cadastrados.  
Cada card de deck exibe:
- Nome do deck
- Quantidade de cards
- Imagem de capa
- Botões de ação:
  - **Gerenciar Cards**
  - **Editar**
  - **Excluir**

### ➕ Criar Deck
Formulário com:
- **Título** (obrigatório)
- **Descrição** (opcional)
- **Upload de imagem** (opcional)

### ✏️ Editar Deck
Formulário igual ao de criação, porém com campos preenchidos previamente.

### 🗂️ Gerenciar Cards
Lista todos os cards do deck selecionado:
- Frente e verso do card
- Botões para **Editar** e **Excluir**
- Botão para criar novo card

### ➕ Criar Card
Formulário com:
- Frente do card (obrigatório)
- Verso do card (obrigatório)

### ✏️ Editar Card
Formulário igual ao de criação, porém com dados do card preenchidos.

---

## 🧩 Estrutura de Rotas (Exemplo)

```javascript
{
  path: '/',
  name: 'Home',
  component: HomePage
},
{
  path: '/decks/create',
  name: 'CreateDeckFormPage',
  component: CreateDeckFormPage
},
{
  path: '/decks/:deckId/edit',
  name: 'EditDeckFormPage',
  component: EditDeckFormPage
},
{
  path: '/decks/:deckId/cards',
  name: 'ManageDeckPage',
  component: ManageDeckPage
},
{
  path: '/cards/create',
  name: 'CreateCardFormPage',
  component: CreateCardFormPage
},
{
  path: '/cards/:cardId/edit',
  name: 'EditCardFormPage',
  component: EditCardFormPage
}
```

## 🎨 Estilo
- Cores suaves e neutras para foco no conteúdo.

- Compatível com dark mode automaticamente.

- Botões arredondados e responsivos com transições suaves.

## 🏗️ Como Rodar o Projeto
Instale dependências

```sh
npm install
```

Inicie o servidor
```sh
npm run dev
```

## 📝 Notas
- Dados Mockados: atualmente os dados estão fixos no código (mock).

- Integração futura: será necessário criar uma API REST para persistir os decks e cards.

- Upload de Imagem: a imagem do deck é carregada via URL de preview; você pode integrar upload real conforme necessário.

## 📧 Contato
Caso tenha dúvidas ou queira contribuir, sinta-se à vontade para abrir issues ou pull requests.
