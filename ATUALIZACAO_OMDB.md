# 🔄 Atualização para API OMDB

## O Que Mudou?

O projeto foi atualizado para usar a **OMDB API** ao invés da TMDB.

### Diferenças Principais

| TMDB | OMDB |
|------|------|
| Endpoint `/movie/popular` | Busca por título específico |
| Retorna arrays de resultados | Retorna 1 filme por busca |
| URLs base de imagens separadas | URLs completas nos posters |
| Estrutura JSON própria | Estrutura IMDb |

### Mudanças Realizadas

1. **API Config** (`src/config/api.js`)
   - Base URL mudou para `http://www.omdbapi.com`
   - Parâmetros ajustados para `apikey` e `r=json`

2. **Requests** (`src/config/requests.js`)
   - Agora usa arrays de títulos de filmes
   - Não depende de endpoints de categorias
   - Listas pré-definidas de filmes populares

3. **Services** (`src/services/movieService.js`)
   - Função `fetchMoviesByTitles()` que busca múltiplos filmes
   - Conversão da estrutura OMDB para estrutura interna
   - Busca adaptada para usar `s=query` ao invés de endpoint de busca

4. **Constants** (`src/config/constants.js`)
   - Função helper `getImageUrl()` para tratar imagens
   - URLs da OMDB já vêm completas

5. **Componentes**
   - Atualizados para usar `getImageUrl()`
   - Compatíveis com a nova estrutura de dados

### Como Funciona Agora?

#### Busca Individual
```javascript
api.get('', {
  params: { t: 'The Matrix' }
})
```

#### Busca Múltipla
```javascript
titles.map(title => 
  api.get('', { params: { t: title } })
)
```

#### Conversão de Dados
```javascript
{
  id: movie.imdbID,
  title: movie.Title,
  overview: movie.Plot,
  poster_path: movie.Poster, // URL completa
  // ... etc
}
```

### Vantagens da OMDB

✅ API Key inclusa (27cb353e)  
✅ Dados do IMDb  
✅ Informações detalhadas (Actors, Director, Awards, etc.)  
✅ Grátis e sem rate limit rígido  
✅ Estável e confiável  

### Estrutura de Dados OMDB

```json
{
  "Title": "Guardians of the Galaxy Vol. 2",
  "Year": "2017",
  "Rated": "PG-13",
  "Released": "05 May 2017",
  "Runtime": "136 min",
  "Genre": "Action, Adventure, Comedy",
  "Director": "James Gunn",
  "Writer": "James Gunn",
  "Actors": "Chris Pratt, Zoe Saldaña",
  "Plot": "...",
  "Language": "English",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar",
  "Poster": "https://m.media-amazon.com/images/...",
  "Ratings": [...],
  "Metascore": "67",
  "imdbRating": "7.6",
  "imdbVotes": "809,834",
  "imdbID": "tt3896198",
  "Type": "movie",
  "BoxOffice": "$389,813,101"
}
```

### Limitações

⚠️ A OMDB não tem endpoint de "filmes populares"  
⚠️ Precisa buscar por título específico  
⚠️ Limitado a 1000 requests/dia (API key gratuita)  

**Solução**: Usamos listas pré-definidas de títulos populares por categoria.

### Customizar Filmes

Para adicionar/remover filmes nas seções, edite `src/config/requests.js`:

```javascript
const requests = {
  trending: [
    'Seu Filme Favorito',
    'Outro Filme',
    // etc...
  ],
  // ...
}
```

---

**O projeto está pronto para usar com a API OMDB!** 🎬

