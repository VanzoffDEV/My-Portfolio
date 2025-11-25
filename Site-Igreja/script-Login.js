// script-login.js
document.addEventListener('DOMContentLoaded', () => {

  // 1. Pega os elementos do HTML
  const btnLogin = document.getElementById('btn-login');
  const usuarioInput = document.getElementById('usuario');
  const senhaInput = document.getElementById('senha');
  const erroMsg = document.getElementById('erro-msg');

  // --- 2. O "Banco de Dados" (INSEGURO!) ---
  // Define os usuários e senhas válidos
  const usuariosValidos = {
    "lider1": "senha123",
    "pastor": "abcd",
    "admin": "igreja2025" 
  };
  // ------------------------------------------

  // 3. A função principal que tenta fazer o login
  function tentarLogin() {
    const usuario = usuarioInput.value;
    const senha = senhaInput.value;

    // 4. Verifica se o usuário existe E se a senha está correta
    if (usuariosValidos[usuario] && usuariosValidos[usuario] === senha) {
      // Deu certo!
      erroMsg.textContent = 'Sucesso! Redirecionando...';
      erroMsg.style.color = 'green';
      
      // Espera 1 segundo e redireciona para a página admin
      setTimeout(() => {
        window.location.href = 'admin.html'; 
      }, 1000); 

    } else {
      // Deu errado
      erroMsg.textContent = 'Usuário ou senha incorretos.';
      erroMsg.style.color = '#d93025'; // Cor vermelha de erro
    }
  }

  // 5. Adiciona os "ouvintes" de evento
  
  // Ouve o clique no botão "Entrar"
  btnLogin.addEventListener('click', tentarLogin);
  
  // Ouve se o usuário apertar "Enter" no campo da senha
  senhaInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      tentarLogin();
    }
  });

});