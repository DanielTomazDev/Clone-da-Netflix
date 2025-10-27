# 🎬 Netflix Clone

Clone da Netflix criado com React + Vite, usando a API do OMDB (Open Movie Database).

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para fazer requisições à API
- **React Icons** - Biblioteca de ícones para React
- **OMDB API** - API para buscar informações de filmes e séries do IMDb

## 📋 Funcionalidades

✅ Banner principal dinâmico com filme em destaque  
✅ Barra de navegação fixa com efeito ao rolar  
✅ Múltiplas seções de filmes (Em Alta, Ação, Comédia, Terror, Romance, etc.)  
✅ Scroll horizontal suave nas seções  
✅ Cards de filmes com efeito hover  
✅ Modal com detalhes completos do filme  
✅ Barra de pesquisa funcional  
✅ Dark/Light mode  
✅ Design totalmente responsivo  
✅ Componentização e reutilização de código  
✅ Hooks customizados  

## 🛠️ Como Usar

### Pré-requisitos

- Node.js 18+ instalado
- Conta no TMDB (gratuita)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/netflix-clone.git
cd netflix-clone
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo env.example para .env
cp env.example .env

# A API Key já está configurada, mas você pode trocar se quiser
# Obtenha sua própria key em: http://www.omdbapi.com
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse no navegador:
```
http://localhost:5173
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse https://vercel.com
3. Conecte seu repositório
4. Adicione a variável de ambiente `VITE_OMDB_API_KEY=27cb353e`
5. Deploy automático!

### Netlify

1. Faça push do código para o GitHub
2. Acesse https://netlify.com
3. Conecte seu repositório
4. Adicione a variável de ambiente `VITE_OMDB_API_KEY` em Site settings > Build & deploy > Environment
5. Deploy!

## 📁 Estrutura do Projeto

```
netflix-clone/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Navbar/       # Barra de navegação
│   │   ├── Banner/       # Banner principal
│   │   ├── Row/          # Seções horizontais
│   │   ├── Card/         # Card de filme
│   │   └── Modal/        # Modal de detalhes
│   ├── config/           # Configurações
│   │   ├── api.js        # Config Axios
│   │   ├── requests.js   # Endpoints da API
│   │   └── constants.js  # Constantes
│   ├── context/          # Context API
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Hooks customizados
│   │   ├── useFetch.js
│   │   └── useScroll.js
│   ├── pages/            # Páginas
│   │   └── Home.jsx
│   ├── services/         # Serviços
│   │   └── movieService.js
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globais
├── public/               # Arquivos estáticos
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customização

### Alterar cores principais

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'netflix-red': '#E50914',
      'netflix-black': '#141414',
    },
  },
}
```

### Adicionar novas seções

1. Adicione o endpoint em `src/config/requests.js`
2. Crie a função em `src/services/movieService.js`
3. Importe e use em `src/pages/Home.jsx`

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Contato

Feito com ❤️ para o seu portfólio!

---

**Nota**: Este é um projeto educacional para portfólio. Não há intenção de infringir direitos autorais da Netflix.

