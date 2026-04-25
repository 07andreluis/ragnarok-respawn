# Calculadora de Respawn de MVPs - Ragnarok Online

Instruções de uso para o projeto.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## Instalação

1. Clone o repositório ou extraia os arquivos
2. Acesse a pasta do projeto
3. Instale as dependências:

```bash
cd back-end
npm install
```

## Configuração

Crie um arquivo `.env` na pasta `back-end` com a variável:

```env
MONGODB_URI=sua_string_de_conexao_mongodb
```

Exemplo para MongoDB local:
```env
MONGODB_URI=mongodb://localhost:27017/respawns
```

Exemplo para MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/respawns?retryWrites=true&w=majority
```

## Executando o Projeto

Na pasta `back-end`, execute:

```bash
npm start
```

O servidor będzie disponível em `http://localhost:3000`.

## Como Usar

### 1. Calcular Respawn

1. Abra a aplicação no navegador
2. Selecione o horário da morte do monstro (use o seletor de data/hora)
3. Escolha o monstro na lista suspensa (MVP ou Miniboss)
4. Clique em "Calcular Respawn"
5. Confirme a ação na mensagem

O card do monstro aparecerá na tela com o horário aproximado do respawn.

### 2. Acompanhar Respawns

- Cards verdes = respawn ainda não ocorreu
- Cards amarelos = dentro da janela de incerteza
- Cards vermelhos = respawn já ocorrido

A página atualiza automaticamente a cada 10 segundos.

### 3. Marcar a Localização do Túmulo

1. Clique no mapa do monstro onde o túmulo está localizado
2. Um marcador vermelho indicará a posição
3. Para remover, clique no botão "Limpar Marcação"

### 4. Excluir um Respawn

1. Clique no ícone de lixeira no card do monstro
2. Confirme a exclusão na mensagem

## Monstros Disponíveis

### MVPs
- Ifrit
- Valkyrie Randgris
- WSM (White Sidekick Monster)
- Corrupted Soul
- Amdarais
- Thanatos

### Miniboss
- Valkzinha (vários mapas)
- Angeling (vários mapas)
- Deviling
- Ghostring

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/respawns` | Lista todos os respawns |
| POST | `/api/respawns` | Cria um novo respawn |
| PATCH | `/api/respawns/:id/tumba` | Atualiza coordenadas do túmulo |
| DELETE | `/api/respawns/:id` | Exclui um respawn |

## Estrura do Projeto

```
ragnarok-respawn/
├── back-end/
│   ├── models/
│   │   └── Respawn.js      # Modelo MongoDB
│   ├── public/
│   │   ├── images/       # Imagens dos monstros
│   │   ├── maps/        # Mapas do jogo
│   │   ├── index.html   # Página principal
│   │   ├── script.js    # Lógica JavaScript
│   │   └── estilo.css   # Estilos
│   ├── server.js        # Servidor Express
│   └── package.json
├── README.md
└── INSTRUCOES.md
```

## Problemas Comuns

**Erro ao conectar no MongoDB**
- Verifique se o MongoDB está em execução
- Confirme a string de conexão no arquivo `.env`

**Página não carrega**
- Verifique se a porta 3000 está disponível
- Execute `npm start` novamente