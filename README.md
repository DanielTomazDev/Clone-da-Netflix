# 🎬 Netflix Clone - Projeto React

Olá! Sou **Daniel Tomaz**, desenvolvedor Front-End, e este é meu projeto de clone da Netflix. Construí essa aplicação completa usando **React + Vite** com o objetivo de demonstrar minhas habilidades em desenvolvimento web moderno.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como uma demonstração completa das minhas competências em:
- **React Hooks** (useState, useEffect, Context API)
- **Gerenciamento de Estado** (localStorage + Context)
- **Integração com APIs** (TMDB API)
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
- **TMDB API** - API de filmes e séries (The Movie Database)

## ✨ Funcionalidades Implementadas

### Sistema de Autenticação
- Login e registro de usuários
- Página de perfil personalizado
- Persistência com localStorage
- Context API para gerenciamento global

### Catálogo de Filmes e Séries
- Banner principal dinâmico com filme em destaque e trailer automático
- 8+ seções organizadas (Em Alta, Ação, Comédia, Terror, Romance, etc.)
- **Scroll automático** quando mouse passar por filme no canto
- **Trailers integrados** com reprodução automática no hover
- Imagens em alta qualidade
- Suporte completo para séries e filmes

### Páginas Individuais de Detalhes
- **Layout reorganizado** com informações abaixo da imagem de fundo
- Informações completas de cada filme/série
- **Sinopse limitada** com botão expandir/recolher
- Sistema de episódios com seletor de temporadas
- Filmes recomendados baseados em gênero
- Botões de interação (Assistir, Favoritar, Marcar como assistido)
- **Trailers integrados** com controles de áudio

### Sistema de Interação
- **Favoritos**: usuários podem favoritar filmes
- **Assistidos**: controle de filmes já vistos
- **Indicadores visuais**: badges nos cards
- **Progresso**: rastreamento de onde parou

### Design Responsivo
- Mobile-first approach
- Breakpoints: mobile, tablet, desktop
- Scroll horizontal suave com **scroll automático inteligente**
- **Hover effects avançados** com trailers automáticos
- Dark mode nativo
- **Layout otimizado** para melhor visualização

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
│   ├── AuthContext.jsx   # Gerenciamento de usuário
│   └── TrailerContext.jsx # Gerenciamento de trailers
├── hooks/            # Hooks customizados
│   └── useScroll.js
├── services/         # Camada de serviços
│   └── movieService.js   # Funções da API TMDB
└── config/           # Configurações
    └── constants.js  # Constantes globais```
    
## 🌐 Deploy

Este projeto está deployado no Vercel: **[https://vercel.com/programadorseniorgirrafales-projects/clone-da-netflix]**

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

## 🎬 Funcionalidades Avançadas Implementadas

### Sistema de Trailers Inteligente
- **Reprodução automática** no hover dos cards
- **Controles de áudio** sem reiniciar o trailer
- **Scroll automático** para centralizar trailers ativos
- **Tela cheia automática** após 5 segundos no banner
- **Integração YouTube** com API completa

### Layout Otimizado
- **Informações reorganizadas** abaixo da imagem de fundo
- **Sinopse inteligente** com expansão controlada
- **Gradiente otimizado** para melhor visualização
- **Responsividade aprimorada** em todos os dispositivos

### Sistema de Séries
- **Suporte completo** para séries e filmes
- **Navegação correta** para páginas de séries
- **Detalhes específicos** de temporadas e episódios
- **API TMDB** para dados mais ricos

## 📈 Melhorias Futuras

- [ ] Sistema de comentários e reviews
- [ ] Notificações de novos lançamentos
- [ ] Recomendação inteligente baseada em IA
- [ ] Exportação de lista para CSV/JSON
- [ ] Modo offline com cache local

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais e demonstrativos. Todas as informações de filmes são provenientes da API TMDB (The Movie Database).

---

**Desenvolvido por Daniel Tomaz**  
Portfolio: em construção | GitHub: [DanielTomazDev](https://github.com/DanielTomazDev)

---

**Nota para avaliadores**: Este projeto representa minha capacidade de criar aplicações React modernas, integrando múltiplas tecnologias e seguindo boas práticas de desenvolvimento. Estou aberto a feedback e sugestões de melhoria!
