# 🚀 Como Fazer Deploy no Vercel

## ⚙️ Configuração de Variáveis de Ambiente

Para que a API funcione no Vercel, você precisa configurar as variáveis de ambiente!

### Passo a Passo:

1. **Acesse Vercel Dashboard**
   - Vá em: https://vercel.com/dashboard
   - Selecione seu projeto "Clone-da-Netflix"

2. **Vá em Settings**
   - Clique em "Settings" no menu do projeto

3. **Environment Variables**
   - Na aba esquerda, clique em "Environment Variables"
   - Adicione a seguinte variável:

```
Name: VITE_OMDB_API_KEY
Value: 27cb353e
Environment: Production, Preview, Development
```

4. **Redeploy**
   - Após adicionar a variável, vá em "Deployments"
   - Clique nos três pontinhos do último deployment
   - Clique em "Redeploy"
   - Selecione "Use existing Build Cache"

## ✅ Verificação

Após o redeploy, acesse seu site e verifique:
- ✅ Banner carrega filmes
- ✅ Seções aparecem com conteúdo
- ✅ Busca funciona
- ✅ Páginas de detalhes funcionam

## 🔍 Se Ainda Não Funcionar

### Verifique o Console do Navegador:

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por erros relacionados à API

### Erros Comuns:

**"API key not found"**
- Certifique-se de que a variável `VITE_OMDB_API_KEY` foi adicionada no Vercel
- Faça redeploy após adicionar

**"Network error"**
- A API OMDB pode estar offline
- Verifique se a chave está correta

**"Failed to fetch"**
- Problema de CORS
- A API OMDB permite CORS, então não deveria ter esse erro

## 🛠️ Alteração de Código (Opcional)

Se você quiser que o código funcione mesmo sem a variável de ambiente configurada, podemos usar a chave diretamente no código. Mas isso não é recomendado por questões de segurança.

## 📝 Checklist de Deploy

- [ ] Variável de ambiente configurada no Vercel
- [ ] Redeploy feito
- [ ] Console do navegador sem erros
- [ ] Filmes carregando na home
- [ ] Busca funcionando
- [ ] Páginas de detalhes funcionando

---

**Dica**: Sempre após configurar variáveis de ambiente no Vercel, é necessário fazer um **Redeploy**!

