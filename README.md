# 🏆 Desafio Técnico Pluga: Desenvolvimento Front-end

Este repositório contém a solução proposta para o desafio técnico da Pluga, focada na construção de uma interface de listagem de aplicativos interativos e gerenciamento de estado de visualização.

## 🌟 O Desafio

O objetivo é desenvolver um aplicativo *front-end* que simule a listagem de aplicativos integráveis da Pluga, implementando funcionalidades essenciais de busca, paginação e rastreamento de histórico de visualização.

### Requisitos Funcionais

1.  **Listagem e Busca:** Criar uma tela principal com uma listagem de *cards* que representam os aplicativos integrados. Deve haver uma barra de busca para filtrar essa listagem.
2.  **Fonte de Dados:** Utilizar o *endpoint* público `https://pluga.co/ferramentas_search.json` para popular a listagem.
3.  **Paginação:** Implementar a paginação da lista, exibindo um máximo de **12 aplicativos** por página.
4.  **Modal Interativo:** Ao clicar em qualquer *card*, um modal deve ser exibido (`ref: wireframe2.png`) contendo:
    * Informações detalhadas do aplicativo selecionado.
    * Um link para acessar a página oficial do aplicativo no site da Pluga (o link está disponível nos dados JSON).
5.  **Histórico de Visualização:** O modal deve incluir uma seção chamada **"Últimas ferramentas visualizadas"**, mostrando os **3 últimos aplicativos** acessados, independentemente da navegação ou paginação.

### Requisitos Técnicos

* **Framework:** O desenvolvimento deve ser feito utilizando **React**.
* **Linguagem (Adicional):** A solução foi implementada utilizando **TypeScript** para maior segurança e escalabilidade.
* **Diferencial:** A escrita de testes unitários ou de integração será considerada um diferencial.

## 🎯 Critérios de Avaliação

A solução será avaliada com base nos seguintes princípios de Engenharia de Software:

* **Legibilidade do Código:** Clareza e aderência a padrões de código.
* **Separação de Responsabilidades:** Organização modular (ex: separação entre componentes de apresentação e lógica de negócio/hooks).
* **Expressividade dos Nomes:** Uso de nomes significativos para variáveis, funções e componentes.
* **Experiência do Usuário (UX):** Atenção aos detalhes, estados vazios (`loading`, *no results*), e usabilidade, inspirando-se no *design* do site Pluga.

---

# 💻 Como Executar o Projeto (React + TypeScript)

Este projeto utiliza **npm** ou **yarn** para gerenciamento de pacotes.

## Pré-requisitos

Certifique-se de que você tem instalado em sua máquina:

* **Node.js:** Versão LTS (preferencialmente 18.x ou superior).
* **npm** (instalado com Node.js) ou **Yarn**.

## Passo a Passo

Siga os comandos abaixo no seu terminal para configurar e iniciar o ambiente de desenvolvimento:

### 1. Clonar o Repositório

Navegue até o diretório do projeto:

```bash
cd [nome-do-diretorio-do-projeto]
```

### 2. Instalar as Dependências

Execute o comando de instalação para baixar todas as bibliotecas e dependências:

```bash
npm install
# OU
yarn install
```

### 3. Iniciar o Servidor de Desenvolvimento

Este comando inicia o aplicativo no modo de desenvolvimento. O projeto estará acessível em http://localhost:3000 (ou outra porta, se a 3000 estiver ocupada).

```bash
npm start
# OU
yarn start
```


### 4. Executar os Testes 

Execução dos testes:

```bash
npm test
# OU
yarn test
```