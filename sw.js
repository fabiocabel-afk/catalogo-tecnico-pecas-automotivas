const CACHE_NAME = 'catalogo-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png', // O ícone é obrigatório para a instalação PWA
  './img/opcao_buscar.png',
  './img/opcao_lista.png',
  './img/opcao_catalogo.png',
  './img/opcao_restauracao.png',
  './img/opcao_novo.png',
  './img/opcao_compartilhar.png',
  './img/opcao_editar.png',
  './img/opcao_excluir.png'
];

// Instala o Service Worker e armazena os arquivos estruturais
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Limpa caches antigos quando houver atualizações
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia Network-First: Garante atualizações rápidas no GitHub Pages
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
