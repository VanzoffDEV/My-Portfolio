document.addEventListener('DOMContentLoaded', () => {
  const btnAdicionarVideo = document.getElementById('btn-adicionar-video');

  if (!btnAdicionarVideo) {
    return;
  }

  btnAdicionarVideo.addEventListener('click', () => {
    const novoTitulo = prompt('Digite o título do NOVO vídeo principal:');
    if (!novoTitulo) return;

    const novaUrl = prompt('Digite a URL do NOVO vídeo principal do YouTube:');
    if (!novaUrl) return;

    const videoPrincipalAtual = JSON.parse(localStorage.getItem('videoPrincipalSalvo')) || videoPadrao;
    const listaAntiga = JSON.parse(localStorage.getItem('videoListaSalva')) || [];

    listaAntiga.unshift(videoPrincipalAtual);
    localStorage.setItem('videoListaSalva', JSON.stringify(listaAntiga));
    adicionarVideoNaListaHTML(videoPrincipalAtual.titulo, videoPrincipalAtual.url);

    const novoVideoPrincipal = {
      titulo: novoTitulo,
      url: novaUrl
    };

    localStorage.setItem('videoPrincipalSalvo', JSON.stringify(novoVideoPrincipal));
    atualizarVideoPrincipalHTML(novoVideoPrincipal.titulo, novoVideoPrincipal.url);
  });
});