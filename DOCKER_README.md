# 🐳 Imagens Docker do Netflix Clone

Essas imagens Docker são uma maneira rápida de executar o Netflix Clone em ambiente de desenvolvimento ou produção. O código fonte está disponível no [GitHub](https://github.com/DanielTomazDev/Clone-da-Netflix).

Essas imagens são baseadas em **Node.js 18 Alpine** e **Nginx Alpine**, oferecendo tamanho otimizado e performance adequada. A imagem de desenvolvimento inclui hot reload automático para desenvolvimento rápido.

## 📋 Tags Disponíveis

Todas as tags estão disponíveis no [Docker Hub](https://hub.docker.com/r/danieltomazdev/netflix-clone):

- **`dev`** - Ambiente de desenvolvimento com hot reload (Node.js 18 + Vite)
- **`prod`** ou **`latest`** - Ambiente de produção otimizado (Nginx Alpine ~40MB)

As imagens são versionadas e incluem labels OCI completos com informações sobre portas, variáveis de ambiente, volumes e features.

## 🚀 Tecnologias Incluídas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento de aplicação SPA
- **Axios** - Cliente HTTP para chamadas à API
- **Nginx** - Servidor web para produção

## 📦 Recursos por Imagem

### Imagem de Desenvolvimento (`dev`)

A imagem de desenvolvimento inclui:

- ✅ **Hot reload automático** - Mudanças no código refletem instantaneamente
- ✅ **HMR (Hot Module Replacement)** - Atualização parcial de módulos
- ✅ **Live reload** - Recarga automática do navegador
- ✅ **Volumes sincronizados** - Código fonte sincronizado em tempo real
- ✅ **Node.js 18 Alpine** - Ambiente leve e otimizado

**Portas:** 5173 (Vite Dev Server)

**Variáveis de Ambiente:**
- `VITE_OMDB_API_KEY` - API Key do OMDB para buscar dados de filmes

**Volumes:**
- `.:/app` - Código sincronizado
- `/app/node_modules` - Cache de dependências

### Imagem de Produção (`prod`)

A imagem de produção inclui:

- ✅ **Build otimizado** - React build com minificação e tree shaking
- ✅ **Multi-stage build** - Node.js build + Nginx Alpine final
- ✅ **Nginx configurado** - Suporte para SPA com React Router
- ✅ **Tamanho reduzido** - Imagem final ~40MB
- ✅ **Otimização de assets** - Imagens e arquivos estáticos otimizados

**Portas:** 80 (HTTP Server)

**Variáveis de Ambiente:**
- `VITE_OMDB_API_KEY` - API Key do OMDB para buscar dados de filmes

**Arquitetura:** Multi-stage build - Node.js 18 Alpine (build) + Nginx Alpine (produção)

## 🏃 Executando os Containers

### Desenvolvimento

Inicie um container de desenvolvimento com hot reload:

```bash
docker run -it --rm \
  -p 5173:5173 \
  -e VITE_OMDB_API_KEY=sua_api_key_aqui \
  -v $(pwd):/app \
  -v /app/node_modules \
  danieltomazdev/netflix-clone:dev
```

Acesse a aplicação em: **http://localhost:5173**

### Produção

Inicie um container de produção:

```bash
docker run -it --rm \
  -p 3000:80 \
  -e VITE_OMDB_API_KEY=sua_api_key_aqui \
  danieltomazdev/netflix-clone:prod
```

Acesse a aplicação em: **http://localhost:3000**

### Usando Docker Compose

Execute o ambiente de desenvolvimento:

```bash
docker-compose up netflix-clone-dev
```

Execute o ambiente de produção:

```bash
docker-compose up netflix-clone
```

## 🔧 Variáveis de Ambiente

### VITE_OMDB_API_KEY

**Obrigatória** - API Key do OMDB (Open Movie Database) para buscar informações de filmes e séries.

**Como obter:**
1. Acesse: http://www.omdbapi.com/apikey.aspx
2. Crie uma conta e gere sua API key
3. Configure no container:

```bash
-e VITE_OMDB_API_KEY=sua_api_key
```

**Exemplo padrão (para testes):**
```bash
-e VITE_OMDB_API_KEY=27cb353e
```

## 📁 Estrutura do Projeto

```
netflix-clone/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── context/        # Context API
│   ├── services/      # Integração com APIs
│   └── config/        # Configurações
├── Dockerfile          # Build de produção
└── Dockerfile.dev      # Ambiente de desenvolvimento
```

## 🎯 Funcionalidades

### Sistema de Autenticação
- Login e registro de usuários
- Página de perfil personalizado
- Persistência com localStorage
- Context API para gerenciamento global

### Catálogo de Filmes
- Banner principal dinâmico
- 8+ seções organizadas por gênero
- Busca em tempo real
- Imagens em alta qualidade

### Páginas de Detalhes
- Informações completas de cada filme/série
- Sistema de episódios para séries
- Filmes recomendados por gênero
- Interações (Favoritar, Marcar como assistido)

## 🔍 Inspeção de Labels

Visualize todos os metadados da imagem:

```bash
# Desenvolvimento
docker inspect danieltomazdev/netflix-clone:dev

# Produção
docker inspect danieltomazdev/netflix-clone:prod
```

Ver todas as labels:

```bash
docker inspect danieltomazdev/netflix-clone:dev --format '{{json .Config.Labels}}' | jq
```

## 📊 Informações das Imagens

### Metadata OCI (Open Container Initiative)

Ambas as imagens incluem labels OCI padrão:

- `org.opencontainers.image.title` - Nome da aplicação
- `org.opencontainers.image.description` - Descrição detalhada
- `org.opencontainers.image.version` - Versão (1.0.0)
- `org.opencontainers.image.vendor` - Daniel Tomaz
- `org.opencontainers.image.authors` - danieltomazdev@gmail.com
- `org.opencontainers.image.source` - Link do GitHub
- `org.opencontainers.image.documentation` - Documentação

### Labels Customizadas

Labels específicas para configuração:

- `com.danieltomazdev.netflix.ports` - Portas expostas
- `com.danieltomazdev.netflix.env.vars` - Variáveis de ambiente
- `com.danieltomazdev.netflix.volumes` - Volumes necessários
- `com.danieltomazdev.netflix.features` - Features inclusas
- `com.danieltomazdev.netflix.architecture` - Arquitetura da imagem

## 🛠️ Build das Imagens

### Desenvolvimento

```bash
docker build -f Dockerfile.dev -t danieltomazdev/netflix-clone:dev .
```

### Produção

```bash
docker build --platform linux/amd64 -f Dockerfile --target production -t danieltomazdev/netflix-clone:prod .
```

## 📝 Exemplos de Uso

### Desenvolvimento com Hot Reload

```bash
# Aplicação com hot reload em /código
docker run -d \
  --name netflix-dev \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e VITE_OMDB_API_KEY=sua_key \
  danieltomazdev/netflix-clone:dev
```

### Produção com Nginx

```bash
# Aplicação de produção
docker run -d \
  --name netflix-prod \
  -p 3000:80 \
  -e VITE_OMDB_API_KEY=sua_key \
  --restart unless-stopped \
  danieltomazdev/netflix-clone:prod
```

### Ver Logs

```bash
# Logs de desenvolvimento
docker logs -f netflix-dev

# Logs de produção
docker logs -f netflix-prod
```

## 🌐 Deployment

### Docker Compose

Use o `docker-compose.yml` incluído:

```yaml
netflix-clone-dev:
  build:
    dockerfile: Dockerfile.dev
  ports:
    - "5173:5173"
  volumes:
    - .:/app
    - /app/node_modules

netflix-clone:
  build:
    dockerfile: Dockerfile
    target: production
  ports:
    - "3000:80"
```

Execute: `docker-compose up`

## 🔗 Links Úteis

- **Código Fonte:** https://github.com/DanielTomazDev/Clone-da-Netflix
- **Docker Hub:** https://hub.docker.com/r/danieltomazdev/netflix-clone
- **Deploy Live:** https://clone-da-netflix-phi.vercel.app
- **OMDB API:** http://www.omdbapi.com

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais e demonstrativos. Todas as informações de filmes são provenientes da API OMDB (Open Movie Database).

---

**Desenvolvido por Daniel Tomaz**  
Portfolio: em construção | GitHub: [DanielTomazDev](https://github.com/DanielTomazDev)

