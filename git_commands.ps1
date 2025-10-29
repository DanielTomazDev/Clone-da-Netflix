# Script para fazer commits e atualizar Docker
Set-Location "D:\Programação\Clone da Netflix"

# Verificar status
Write-Host "=== Status do Git ===" -ForegroundColor Green
git status

# Adicionar todos os arquivos
Write-Host "=== Adicionando arquivos ===" -ForegroundColor Green
git add .

# Fazer commit das mudanças
Write-Host "=== Fazendo commit ===" -ForegroundColor Green
git commit -m "feat: Implementar scroll automático, corrigir séries e reorganizar layout

- Adicionar scroll automático quando mouse passar por filme no canto
- Corrigir problema de séries não abrindo página (tipo hardcoded)
- Reorganizar layout: mover informações do filme para abaixo da imagem
- Implementar sinopse limitada com botão expandir/recolher
- Melhorar posicionamento e responsividade
- Adicionar logs de debug para monitoramento
- Atualizar gradiente para mostrar mais da imagem de fundo"

# Fazer push
Write-Host "=== Fazendo push ===" -ForegroundColor Green
git push origin main

Write-Host "=== Commits concluídos ===" -ForegroundColor Green
