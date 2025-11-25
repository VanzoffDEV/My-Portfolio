// --- 1. VÍDEO PADRÃO ---
// Este é o vídeo que carrega se a "memória" estiver vazia.
// !! TROQUE A URL ABAIXO por um link válido do YouTube !!
const videoPadrao = {
  titulo: 'Culto da Família', // Coloque o título do seu vídeo padrão
  url: 'https://www.youtube.com/watch?v=YjiNW9yGO3U' 
};

// --- 2. FUNÇÕES DE "AJUDA" (Helpers) ---

// Converte URL do YouTube para URL de embed
function getEmbedUrl(urlVideo) {
  let videoId = '';
  if (!urlVideo) return ''; 
  if (urlVideo.includes("youtube.com/watch?v=")) {
    videoId = urlVideo.split("v=")[1].split("&")[0];
  } else if (urlVideo.includes("youtu.be/")) {
    videoId = urlVideo.split("youtu.be/")[1].split("?")[0];
  } else if (urlVideo.includes("youtube.com/embed/")) {
    return urlVideo; // Já é um link de embed
  }
  
  if(videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return ''; 
}

// Cria e retorna um elemento iframe para o vídeo
function criarIframeVideo(embedUrl) {
  const iframeVideo = document.createElement('iframe');
  iframeVideo.src = embedUrl;
  iframeVideo.setAttribute('frameborder', '0');
  iframeVideo.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframeVideo.setAttribute('allowfullscreen', '');
  return iframeVideo;
}


// --- 3. FUNÇÕES DE "DESENHAR" NA TELA ---

// Coloca um vídeo na lista (sempre no topo)
function adicionarVideoNaListaHTML(titulo, urlOriginal) {
    const listaVideosContainer = document.getElementById('lista-videos-container');
    if (!listaVideosContainer) return; // Segurança

    const embedUrl = getEmbedUrl(urlOriginal);
    if (!embedUrl) return;

    const videoItemDiv = document.createElement('div');
    videoItemDiv.classList.add('video-item');

    const tituloH3 = document.createElement('h3');
    tituloH3.textContent = titulo;

    const iframeVideo = criarIframeVideo(embedUrl);

    // --- NOVO: Botão de Excluir ---
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir Vídeo';
    btnExcluir.style.backgroundColor = '#ff4d4d'; // Vermelho
    btnExcluir.style.color = 'white';
    btnExcluir.style.border = 'none';
    btnExcluir.style.padding = '5px 10px';
    btnExcluir.style.cursor = 'pointer';
    btnExcluir.style.marginTop = '5px';
    
    // Ação ao clicar no botão Excluir
    btnExcluir.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir este vídeo?')) {
            // 1. Remove da tela
            videoItemDiv.remove();

            // 2. Remove da memória (LocalStorage)
            const listaSalva = JSON.parse(localStorage.getItem('videoListaSalva')) || [];
            
            // Filtra a lista mantendo apenas os vídeos que NÃO têm essa URL
            const novaLista = listaSalva.filter(video => video.url !== urlOriginal);
            
            // Salva a lista atualizada
            localStorage.setItem('videoListaSalva', JSON.stringify(novaLista));
        }
    });
    // ------------------------------

    videoItemDiv.appendChild(tituloH3);
    videoItemDiv.appendChild(iframeVideo);
    
    // Só adiciona o botão visualmente
    videoItemDiv.appendChild(btnExcluir);

    listaVideosContainer.prepend(videoItemDiv);
}

// Coloca o vídeo no player principal
function atualizarVideoPrincipalHTML(titulo, urlOriginal) {
  const videoPrincipalContainer = document.getElementById('video-principal-container');
  if (!videoPrincipalContainer) return; // Segurança

  const embedUrl = getEmbedUrl(urlOriginal);
  if (!embedUrl) {
      videoPrincipalContainer.innerHTML = '<p style="color:white; text-align:center;">Vídeo indisponível ou link inválido.</p>';
      return; 
  }

  videoPrincipalContainer.innerHTML = '';
  const iframeVideo = criarIframeVideo(embedUrl);
  videoPrincipalContainer.appendChild(iframeVideo);
}


// --- 4. LÓGICA DE CARREGAMENTO INICIAL ---
// Isso roda assim que a página (index ou admin) carregar
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Carrega o vídeo principal salvo (ou usa o padrão)
  const videoPrincipalSalvo = JSON.parse(localStorage.getItem('videoPrincipalSalvo')) || videoPadrao;
  atualizarVideoPrincipalHTML(videoPrincipalSalvo.titulo, videoPrincipalSalvo.url);

  // 2. Carrega a LISTA de vídeos salvos (ou uma lista vazia)
  const videoListaSalva = JSON.parse(localStorage.getItem('videoListaSalva')) || [];
  
  // 3. Desenha a lista na tela
  const listaVideosContainer = document.getElementById('lista-videos-container');
  if (listaVideosContainer) {
    listaVideosContainer.innerHTML = ''; // Limpa a lista antes de preencher
    videoListaSalva.forEach(video => {
      adicionarVideoNaListaHTML(video.titulo, video.url);
    });
  }
});