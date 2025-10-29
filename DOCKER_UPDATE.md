# 🐳 Atualização da Imagem Docker - Netflix Clone

## 📋 Instruções para Atualizar a Imagem Docker

### 1. Fazer Commits das Mudanças

```bash
# Navegar para o diretório do projeto
cd "D:\Programação\Clone da Netflix"

# Verificar status
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: Implementar scroll automático, corrigir séries e reorganizar layout

- Adicionar scroll automático quando mouse passar por filme no canto
- Corrigir problema de séries não abrindo página (tipo hardcoded)
- Reorganizar layout: mover informações do filme para abaixo da imagem
- Implementar sinopse limitada com botão expandir/recolher
- Melhorar posicionamento e responsividade
- Adicionar logs de debug para monitoramento
- Atualizar gradiente para mostrar mais da imagem de fundo"

# Fazer push
git push origin main
```

### 2. Construir Nova Imagem Docker

```bash
# Construir imagem de produção
docker build -t danieltomazdev/netflix-clone:latest .

# Construir imagem de desenvolvimento
docker build -f Dockerfile.dev -t danieltomazdev/netflix-clone:dev .

# Verificar imagens criadas
docker images | grep netflix-clone
```

### 3. Fazer Push das Imagens

```bash
# Fazer login no Docker Hub (se necessário)
docker login

# Push da imagem de produção
docker push danieltomazdev/netflix-clone:latest

# Push da imagem de desenvolvimento
docker push danieltomazdev/netflix-clone:dev
```

### 4. Testar as Imagens

```bash
# Testar imagem de produção
docker run -p 3000:80 danieltomazdev/netflix-clone:latest

# Testar imagem de desenvolvimento
docker run -p 5173:5173 danieltomazdev/netflix-clone:dev
```

### 5. Atualizar Docker Compose (se necessário)

```yaml
# docker-compose.yml
services:
  netflix-clone:
    image: danieltomazdev/netflix-clone:latest
    # ... resto da configuração

  netflix-clone-dev:
    image: danieltomazdev/netflix-clone:dev
    # ... resto da configuração
```

## 🎬 Novas Funcionalidades Incluídas

### Sistema de Trailers Inteligente
- ✅ **Reprodução automática** no hover dos cards
- ✅ **Controles de áudio** sem reiniciar o trailer
- ✅ **Scroll automático** para centralizar trailers ativos
- ✅ **Tela cheia automática** após 5 segundos no banner
- ✅ **Integração YouTube** com API completa

### Layout Otimizado
- ✅ **Informações reorganizadas** abaixo da imagem de fundo
- ✅ **Sinopse inteligente** com expansão controlada
- ✅ **Gradiente otimizado** para melhor visualização
- ✅ **Responsividade aprimorada** em todos os dispositivos

### Sistema de Séries
- ✅ **Suporte completo** para séries e filmes
- ✅ **Navegação correta** para páginas de séries
- ✅ **Detalhes específicos** de temporadas e episódios
- ✅ **API TMDB** para dados mais ricos

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente Necessárias

```env
# Chave da API TMDB (The Movie Database)
# API Key: fa7e4d688f969937e7c96565355b6d51
# Documentação: https://www.themoviedb.org/documentation/api
VITE_TMDB_API_KEY=fa7e4d688f969937e7c96565355b6d51
```

### Portas Utilizadas

- **Desenvolvimento**: 5173 (Vite dev server)
- **Produção**: 80 (Nginx)

## 📊 Informações da Imagem

### Labels Incluídas

```dockerfile
LABEL org.opencontainers.image.title="Netflix Clone - React Application"
LABEL org.opencontainers.image.description="Clone da Netflix desenvolvido em React com Vite, Tailwind CSS e integração com TMDB API"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.authors="Daniel Tomaz <danieltomazdev@gmail.com>"
LABEL org.opencontainers.image.url="https://github.com/DanielTomazDev/Clone-da-Netflix"
LABEL org.opencontainers.image.source="https://github.com/DanielTomazDev/Clone-da-Netflix"
LABEL org.opencontainers.image.documentation="https://github.com/DanielTomazDev/Clone-da-Netflix#readme"
LABEL com.daniel.netflix.tech="React, Vite, Tailwind CSS, TMDB API, YouTube API"
LABEL com.daniel.netflix.features="Trailers automáticos, Scroll inteligente, Layout responsivo"
LABEL com.daniel.netflix.env.vars="VITE_TMDB_API_KEY (API Key do TMDB para buscar dados dos filmes)"
```

## 🚀 Comandos Rápidos

```bash
# Build e push completo
docker build -t danieltomazdev/netflix-clone:latest . && docker push danieltomazdev/netflix-clone:latest

# Testar localmente
docker run -p 3000:80 -e VITE_TMDB_API_KEY=fa7e4d688f969937e7c96565355b6d51 danieltomazdev/netflix-clone:latest

# Ver logs
docker logs <container_id>
```

## 📝 Notas Importantes

1. **API Key**: A chave da API TMDB está incluída por padrão, mas pode ser sobrescrita via variável de ambiente
2. **Hot Reload**: Disponível apenas na imagem de desenvolvimento
3. **Otimização**: A imagem de produção é otimizada com Nginx e arquivos estáticos
4. **Multi-stage**: Build otimizado para reduzir tamanho da imagem final

---

**Desenvolvido por Daniel Tomaz**  
GitHub: [DanielTomazDev](https://github.com/DanielTomazDev)
