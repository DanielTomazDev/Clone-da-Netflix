# 🎬 Netflix Clone - Projeto React

Olá! Sou **Daniel Tomaz**, desenvolvedor Front-End, e este é meu projeto de clone da Netflix. Construí essa aplicação completa usando **React + Vite** com o objetivo de demonstrar minhas habilidades em desenvolvimento web moderno.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como uma demonstração completa das minhas competências em:
- **React Hooks** (useState, useEffect, Context API)
- **Gerenciamento de Estado** (localStorage + Context)
- **Integração com APIs** (OMDB API)
- **Design Responsivo** (mobile-first com Tailwind CSS)
- **Roteamento** (React Router)
- **UX/UI Moderna**

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento de aplicação
- **Axios** - Cliente HTTP para chamadas à API
- **React Icons** - Ícones SVG
- **OMDB API** - API de filmes e séries

## ✨ Funcionalidades Implementadas

### Sistema de Autenticação
- Login e registro de usuários
- Página de perfil personalizado
- Persistência com localStorage
- Context API para gerenciamento global

### Catálogo de Filmes
- Banner principal dinâmico com filme em destaque
- 8+ seções organizadas (Em Alta, Ação, Comédia, Terror, Romance, etc.)
- Busca em tempo real
- Imagens em alta qualidade

### Páginas Individuais de Detalhes
- Informações completas de cada filme/série
- Sistema de episódios com seletor de temporadas
- Filmes recomendados baseados em gênero
- Botões de interação (Assistir, Favoritar, Marcar como assistido)

### Sistema de Interação
- **Favoritos**: usuários podem favoritar filmes
- **Assistidos**: controle de filmes já vistos
- **Indicadores visuais**: badges nos cards
- **Progresso**: rastreamento de onde parou

### Design Responsivo
- Mobile-first approach
- Breakpoints: mobile, tablet, desktop
- Scroll horizontal suave
- Hover effects profissionais
- Dark mode nativo

## 🏗️ Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Banner/       # Banner hero
│   ├── Card/         # Cards de filmes
│   ├── Modal/        # Modal de detalhes
│   ├── Navbar/       # Barra de navegação
│   └── Row/          # Seções horizontais
├── pages/            # Páginas da aplicação
│   ├── Home.jsx      # Página inicial
│   ├── Login.jsx     # Login/Registro
│   ├── Profile.jsx   # Perfil do usuário
│   └── MovieDetails.jsx  # Detalhes do filme
├── context/          # Context API
│   └── AuthContext.jsx   # Gerenciamento de usuário
├── hooks/            # Hooks customizados
│   ├── useFetch.js
│   └── useScroll.js
├── services/         # Camada de serviços
│   └── movieService.js   # Funções da API
└── config/           # Configurações
    ├── api.js        # Configuração Axios
    ├── requests.js   # Endpoints da API
    └── constants.js  # Constantes globais
```

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/DanielTomazDev/Clone-da-Netflix.git
cd Clone-da-Netflix
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## 🌐 Deploy

Este projeto está deployado no Vercel: **[Link do projeto]**

### Configuração para Deploy
Para fazer deploy em qualquer plataforma (Vercel, Netlify, etc.), adicione a seguinte variável de ambiente:

```
VITE_OMDB_API_KEY=27cb353e
```

## 💡 Diferenciais Técnicos

### 1. Performance
- Imagens otimizadas em alta qualidade
- Lazy loading implementado
- Timeout para evitar travamentos
- Carregamento assíncrono com Promise.all

### 2. Experiência do Usuário
- Feedback visual em todas as ações
- Loading states adequados
- Tratamento de erros robusto
- Transições suaves

### 3. Código Limpo
- Componentização eficiente
- Hooks customizados reutilizáveis
- Separação de responsabilidades
- Nomenclatura semântica

### 4. Boas Práticas
- Responsive design mobile-first
- Acessibilidade básica (aria-labels)
- Estrutura escalável
- Documentação inline

## 🎯 Funcionalidades em Destaque

### Sistema de Favoritos
Implementei um sistema completo de favoritos que permite aos usuários:
- Adicionar/remover filmes dos favoritos
- Visualizar lista completa no perfil
- Indicadores visuais nos cards
- Persistência automática

### Rastreamento de Assistidos
Sistema que controla:
- Quais filmes já foram assistidos
- Badges visuais de status
- Lista de filmes completados
- Controle de progresso

### Páginas de Detalhes
Para cada filme, criei uma página completa com:
- Informações detalhadas (diretor, elenco, prêmios)
- Sistema de episódios (para séries)
- Seletor de temporadas
- Grid de filmes recomendados

## 📱 Responsividade

O projeto foi desenvolvido com foco em todos os dispositivos:

- **Mobile** (< 640px): Layout otimizado, navegação simplificada
- **Tablet** (640px - 1024px): Layout intermediário com melhor aproveitamento
- **Desktop** (> 1024px): Experiência completa com todos os recursos

## 🔧 Decisões Técnicas

### Por que React + Vite?
- **Vite** oferece desenvolvimento extremamente rápido
- HMR (Hot Module Replacement) instantâneo
- Build otimizado para produção

### Por que Context API?
- Gerenciamento de estado simples e eficaz
- Evita prop drilling
- Ideal para este escopo do projeto

### Por que Tailwind CSS?
- Desenvolvimento rápido
- Design system consistente
- Purge automático para otimização

## 📈 Melhorias Futuras

- [ ] Sistema de comentários e reviews
- [ ] Player de trailer integrado (YouTube API)
- [ ] Notificações de novos lançamentos
- [ ] Recomendação inteligente baseada em IA
- [ ] Exportação de lista para CSV/JSON

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais e demonstrativos. Todas as informações de filmes são provenientes da API OMDB (Open Movie Database).

---

**Desenvolvido por Daniel Tomaz**  
Portfolio: em construção | GitHub: [DanielTomazDev](https://github.com/DanielTomazDev)

---

**Nota para avaliadores**: Este projeto representa minha capacidade de criar aplicações React modernas, integrando múltiplas tecnologias e seguindo boas práticas de desenvolvimento. Estou aberto a feedback e sugestões de melhoria!
