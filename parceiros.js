const beneficiosConteudo = [
    {
        imgSrc: 'https://mail.conexaoazul.com/blueftp/afiliação.svg',
        texto: 'Afiliação exclusiva e gratuita',
        descricao: 'Faça parte de nossa rede de parceiros e tenha acesso a uma comunidade engajada de profissionais do mercado. Juntos, alcançaremos novos patamares de sucesso.'
    },
    {
        imgSrc: 'https://mail.conexaoazul.com/blueftp/comissao.png',
        texto: 'Comissão por cada nova venda',
        descricao: 'Receba comissões atrativas por cada cliente que você indicar e que se tornar um assinante da Conexão Azul. Quanto mais você indicar, mais você ganha!'
    },
    {
        imgSrc: 'https://mail.conexaoazul.com/blueftp/suporte.svg',
        texto: 'Suporte Exclusivo',
        descricao: 'Nossa equipe dedicada de suporte estará sempre pronta para ajudar você e seus clientes, fornecendo orientações, treinamentos e soluções personalizadas. Juntos, enfrentaremos qualquer desafio!'
    },
    {
        imgSrc: 'https://mail.conexaoazul.com/blueftp/marca.svg',
        texto: 'Marca Própria (White Label)',
        descricao: 'Leve sua marca para o próximo nível com nossa opção de white label. Personalize a plataforma da Conexão Azul com a sua identidade visual e estabeleça uma presença única no mercado.'
    },
    {
        imgSrc: 'https://mail.conexaoazul.com/blueftp/marketing.svg',
        texto: 'Ferramentas de Marketing',
        descricao: 'Aproveite nossas ferramentas de marketing exclusivas para promover sua parceria e atrair mais clientes. Receba materiais de marketing co-branded e suporte para suas campanhas.'
    },
];
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowTop = windowHeight * 0.25; // 10% do viewport height
    const windowBottom = windowHeight * 0.6; // 60% do viewport height

    return (
      rect.top >= windowTop && // Começa a partir de 10% do topo
      rect.bottom <= windowBottom // Termina em 60% do topo
    );
}

function atualizarVersaoMobile() {
  const liBeneficios = document.querySelectorAll('.beneficio-card');

  for (let i = 0; i < liBeneficios.length; i++) {
    if (isElementInViewport(liBeneficios[i])) {
      const conteudo = beneficiosConteudo[i];
      liBeneficios[i].querySelector('.beneficio-mobile').innerHTML = `
        <div>
          <img class="bnf-mob-img" src="${conteudo.imgSrc}" alt="afilição_conexão_azul">
        </div>
        <div class="bnf-mob-text">
          <p>${conteudo.descricao}</p>
          <button class="button">Quero ser parceiro</button>
        </div>
      `;
      liBeneficios[i].querySelector('.beneficios-card').classList.add('background-branco');
      liBeneficios[i].querySelector('.beneficios-texto').classList.add('color-azul');
    } else {
      liBeneficios[i].querySelector('.beneficio-mobile').innerHTML = ''
      liBeneficios[i].querySelector('.beneficios-card').classList.remove('background-branco');
      liBeneficios[i].querySelector('.beneficios-texto').classList.remove('color-azul');
    }
  }
};


let scrollTimeout;
function handleScroll() {
  const viewportWidth = window.innerWidth;
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  if (viewportWidth < 900) {
    scrollTimeout = setTimeout(atualizarVersaoMobile, 10);
  } else {
    scrollTimeout = setTimeout(atualizarVersaoWeb, 5);
  }
}

function atualizarVersaoWeb() {
  const beneficiosCards = document.querySelectorAll(".beneficios-card");
  const liBeneficios = document.querySelectorAll('.beneficio-card');
  const versaoWeb = document.getElementById("beneficio-web");

  let conteudoEncontrado = false; // Variável para verificar se o conteúdo já foi encontrado

  for (let i = 0; i < beneficiosCards.length; i++) {
    if (isElementInViewport(beneficiosCards[i])) {
      const conteudo = beneficiosConteudo[i];
      versaoWeb.innerHTML = `
        <div>
          <img class="bnf-mob-img" src="${conteudo.imgSrc}" alt="afilição_conexão_azul">
        </div>
        <div class="bnf-mob-text">
          <p>${conteudo.descricao}</p>
          <button class="button">Quero ser parceiro</button>
        </div>
      `;

      // Remove as classes de todos os elementos
      beneficiosCards.forEach(card => card.classList.remove('background-branco'));
      liBeneficios.forEach(li => li.querySelector('.beneficios-texto').classList.remove('color-azul'));

      // Adiciona as classes apenas para o item atual que está visível na viewport
      beneficiosCards[i].classList.add('background-branco');
      liBeneficios[i].querySelector('.beneficios-texto').classList.add('color-azul');

      conteudoEncontrado = true; // Indica que o conteúdo foi encontrado
    }
  }

  // Se não encontrar conteúdo, limpa a div "beneficio-web"
  if (!conteudoEncontrado) {
    versaoWeb.innerHTML = '';
  }
}

window.addEventListener('scroll', handleScroll);
handleScroll();
