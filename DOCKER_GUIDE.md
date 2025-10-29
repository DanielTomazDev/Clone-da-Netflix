# 🐳 Guia de Uso do Docker - Netflix Clone

## 📋 Pré-requisitos

- Docker Desktop instalado
- Docker Compose instalado (vem com Docker Desktop)

## 🚀 Como Usar

### Desenvolvimento (Hot Reload)

```bash
# Iniciar em modo desenvolvimento
docker-compose up netflix-clone-dev

# Ou em background
docker-compose up -d netflix-clone-dev
```

**Acesso:** http://localhost:5173

### Produção (Otimizado)

```bash
# Build e iniciar produção
docker-compose up netflix-clone

# Ou em background
docker-compose up -d netflix-clone
```

**Acesso:** http://localhost:3000

### Parar os Containers

```bash
# Parar todos
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## 📝 Comandos Úteis

### Ver logs

```bash
docker-compose logs -f netflix-clone
docker-compose logs -f netflix-clone-dev
```

### Rebuild (após mudanças no código)

```bash
docker-compose build netflix-clone
docker-compose up netflix-clone
```

### Inspecionar container

```bash
docker ps
docker inspect <container_id>
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# Chave da API TMDB (The Movie Database)
# API Key: fa7e4d688f969937e7c96565355b6d51
# Documentação: https://www.themoviedb.org/documentation/api
VITE_TMDB_API_KEY=fa7e4d688f969937e7c96565355b6d51
```

## 🏷️ Labels

Cada imagem inclui metadata útil:

```bash
# Ver labels
docker inspect netflix-clone | grep Label

# Filtrar por stage
docker images --filter "label=stage=production"
```

## 📊 Arquitetura

- **Development**: Node + Vite com hot reload
- **Production**: Nginx servindo arquivos estáticos otimizados
- **Multi-stage build**: Imagem final leve (~40MB)
- **API Integration**: TMDB para dados de filmes e séries
- **Trailer Support**: Integração YouTube para trailers

## 🎬 Funcionalidades da Aplicação

### Sistema de Trailers
- **Reprodução automática** no hover dos cards
- **Controles de áudio** sem reiniciar o trailer
- **Scroll automático** para centralizar trailers ativos
- **Tela cheia automática** após 5 segundos no banner

### Layout Otimizado
- **Informações reorganizadas** abaixo da imagem de fundo
- **Sinopse inteligente** com expansão controlada
- **Gradiente otimizado** para melhor visualização
- **Responsividade aprimorada** em todos os dispositivos

### Suporte Completo
- **Filmes e séries** com navegação correta
- **Detalhes específicos** de temporadas e episódios
- **API TMDB** para dados mais ricos e atualizados

