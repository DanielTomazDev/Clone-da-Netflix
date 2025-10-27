# 🎯 Como Usar Este Projeto

## 📌 Para Desenvolvedores

Este projeto é um **clone educacional da Netflix** criado com React e Vite. 

### ✅ Características

- ⚡ **Rápido** - Construído com Vite para desenvolvimento ultrarrápido
- 🎨 **Moderno** - UI limpa e moderna com Tailwind CSS
- 📱 **Responsivo** - Funciona perfeitamente em qualquer dispositivo
- 🔍 **Busca Inteligente** - Busca em tempo real na API do TMDB
- 🌙 **Tema Escuro** - Modo claro/escuro integrado
- 🎭 **Animações Suaves** - Transições e efeitos hover profissionais

## 🎓 O Que Você Aprende Com Este Projeto

### Componentização
```
src/components/
├── Navbar/     - Barra de navegação reutilizável
├── Banner/     - Banner principal dinâmico
├── Row/        - Seções horizontais
├── Card/       - Cards de filmes
└── Modal/      - Modal de detalhes
```

### Hooks Customizados
```javascript
// src/hooks/
useFetch()   - Buscar dados da API
useScroll()  - Detectar scroll da página
```

### Context API
```javascript
// src/context/ThemeContext.jsx
ThemeProvider - Gerenciar tema (dark/light)
```

### Services Layer
```javascript
// src/services/movieService.js
Separação clara de lógica de negócio
```

## 🚀 Próximos Passos

Após instalar e executar o projeto:

1. **Explore os componentes** - Veja como cada parte foi construída
2. **Experimente as funcionalidades** - Busca, tema, scroll, etc.
3. **Customize** - Mude cores, adicione novas seções
4. **Melhore** - Adicione funcionalidades que você acha que faltam
5. **Deploy** - Coloque no seu portfólio

## 💡 Dicas de Customização

### Mudar Cores

Edite `tailwind.config.js`:

```javascript
colors: {
  'netflix-red': '#E50914',  // Cor principal
  'netflix-black': '#141414', // Cor de fundo
}
```

### Adicionar Nova Seção

1. Adicione endpoint em `src/config/requests.js`
2. Crie função em `src/services/movieService.js`
3. Importe e use em `src/pages/Home.jsx`

### Adicionar Funcionalidade de Play

Atualmente os botões de play são apenas visuais. Para adicionar funcionalidade real:

1. Crie um componente de vídeo
2. Integre com YouTube API ou outro provedor
3. Conecte aos botões existentes

## 📊 Estrutura de Arquivos

```
netflix-clone/
├── src/
│   ├── components/    # Componentes React
│   ├── config/        # Configurações
│   ├── context/       # Context API
│   ├── hooks/         # Hooks customizados
│   ├── pages/         # Páginas
│   ├── services/      # Serviços/API
│   ├── App.jsx        # App principal
│   └── main.jsx       # Entry point
├── public/            # Assets estáticos
├── index.html
├── package.json
└── README.md
```

## 🎯 Objetivos do Projeto

- ✅ Demonstrar conhecimento em React
- ✅ Mostrar habilidades com APIs
- ✅ Exibir design responsivo
- ✅ Mostrar organização de código
- ✅ Demonstrar uso de hooks e context
- ✅ Portfolio pronto para LinkedIn

## ⚠️ Importante

Este é um projeto **educacional e não comercial**. 

- Criado para fins de aprendizado
- Ideal para portfólio
- Não deve ser usado comercialmente
- Não tem intenção de infringir direitos autorais

## 📞 Suporte

Se tiver dúvidas, consulte:

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Tailwind](https://tailwindcss.com)
- [TMDB API Docs](https://www.themoviedb.org/documentation/api)

---

**Boa sorte com seu projeto!** 🚀

