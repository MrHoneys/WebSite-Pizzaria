// Lógica para o menu hambúrguer
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});




  // Obtém o botão de subir para o topo
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Mostra o botão quando o usuário rolar para baixo
  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "block"; // Torna o botão visível
      scrollToTopBtn.style.opacity = 1; // Torna o botão totalmente opaco
    } else {
      scrollToTopBtn.style.opacity = 0; // Torna o botão transparente
      setTimeout(function() {
        scrollToTopBtn.style.display = "none"; // Esconde o botão após a transição de opacidade
      }, 300); // O tempo de espera para esconder o botão após a animação de opacidade
    }
  };

  // Função personalizada para rolar até o topo com velocidade controlada
  function scrollToTop() {
    const scrollDuration = 1000; // Duração da rolagem em milissegundos
    const startPosition = window.pageYOffset; // Posição inicial de rolagem
    const distance = startPosition; // Distância para rolar até o topo
    let startTime = null;

    // Função de animação da rolagem
    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, -distance, scrollDuration);

      window.scrollTo(0, run);

      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(animateScroll); // Continua a animação até a duração
      }
    }

    // Função de easing para suavizar a rolagem
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animateScroll); // Inicia a animação
  }

  // Evento de clique para rolar até o topo com animação personalizada
  scrollToTopBtn.addEventListener("click", function() {
    scrollToTop();
  });





  // Função de rolagem suave com controle de velocidade
  function smoothScrollTo(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Função que é chamada repetidamente durante o processo de rolagem
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    // Função de easing para uma rolagem mais suave
    function ease(t, b, c, d) {
      const easeInOutQuad = (t) => {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
      };
      return easeInOutQuad(t);
    }

    requestAnimationFrame(animation);
  }

  // Selecionar todos os links de âncoras
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // Adicionar evento de clique para rolagem suave
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();  // Impede o comportamento padrão de navegação

      // Obtém o destino do link (o id da seção)
      const targetId = this.getAttribute('href').substring(1);  // Remove o #
      const targetElement = document.getElementById(targetId);

      // Controlar a duração (em milissegundos) da rolagem (exemplo: 1000ms = 1 segundo)
      smoothScrollTo(targetElement, 1000);  // Duração de 1000ms
    });
  });   