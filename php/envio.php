<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem = trim($_POST["mensagem"]);

    // Configurar destinatário (deixe em branco para colocar depois)
    $destinatario = ""; // "joaodanieltomazz@gmail.com"

    // Assunto do e-mail
    $assunto = "Resposta de Cliente";

    // Cabeçalhos
    $headers = "From: $nome <$email>";

    // Enviar e-mail
    if (mail($destinatario, $assunto, $mensagem, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar mensagem.";
    }
} else {
    echo "Método inválido.";
}
?>