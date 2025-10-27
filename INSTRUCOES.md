# 📋 Instruções de Instalação e Uso

## 🚀 Como Começar

### 1. Instalar Dependências

No terminal, execute:

```bash
npm install
```

### 2. Obter API Key do TMDB

1. Acesse https://www.themoviedb.org/
2. Crie uma conta gratuita (não leva 5 minutos)
3. Vá em **Configurações** → **API**
4. Solicite uma API Key (gratuita para desenvolvedores)
5. Copie sua API Key

### 3. Configurar Variável de Ambiente

1. Na raiz do projeto, crie um arquivo chamado `.env` (sem a extensão .example)
2. Adicione o seguinte conteúdo:

```
VITE_TMDB_API_KEY=sua_api_key_aqui
```

**IMPORTANTE**: Substitua `sua_api_key_aqui` pela sua API Key real!

### 4. Iniciar o Projeto

Execute no terminal:

```bash
npm run dev
```

O projeto estará rodando em `http://localhost:5173`

## 📦 Comandos Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Previa do build de produção

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push para o GitHub
2. Acesse https://vercel.com e faça login com GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Adicione a variável de ambiente `VITE_TMDB_API_KEY` com sua API Key
6. Clique em Deploy

### Netlify

1. Faça push para o GitHub
2. Acesse https://netlify.com e faça login com GitHub
3. Clique em "Add new site" → "Import an existing project"
4. Selecione seu repositório
5. Nas configurações de build, deixe:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Adicione a variável de ambiente `VITE_TMDB_API_KEY` em Site settings → Environment
7. Clique em "Deploy site"

## 🔧 Troubleshooting

### Erro "Invalid API Key"

- Verifique se a variável de ambiente está configurada corretamente
- No Vercel/Netlify, certifique-se de que a variável foi adicionada corretamente
- Reinicie o servidor após alterar o arquivo .env

### Erro de CORS

Se você receber erros de CORS ao rodar localmente, isso é normal e não afetará o build de produção.

### Imagens não aparecem

Alguns filmes podem não ter poster na API. Isso é esperado e há um placeholder definido.

## 📝 Observações Importantes

- Este é um projeto **educacional** e **não comercial**
- Usado apenas para fins de aprendizado e portfólio
- Não há intenção de infringir direitos autorais
- API do TMDB é gratuita até 40 requisições por 10 segundos

## 🎓 Estrutura Aprendida

Este projeto demonstra:

✅ Componentização em React  
✅ Uso de Hooks customizados  
✅ Context API para gerenciamento de estado  
✅ Consumo de API REST  
✅ Design responsivo com Tailwind CSS  
✅ Scroll horizontal personalizado  
✅ Efeitos de hover e transições  
✅ Sistema de temas (Dark/Light)  
✅ Barra de pesquisa em tempo real  
✅ Modal com informações detalhadas  

---

**Pronto para seu portfólio!** 🚀

