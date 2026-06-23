const programs = {
  method: {
    type: 'Флагман',
    title: 'Метод Усмановой',
    description: 'База для красивой техники, регулярности и уверенного результата без перегрузки.',
    image: 'assets/method.png',
    facts: ['Старт для любого уровня', 'Тренировки дома', 'Фокус на технике и привычке'],
  },
  slim: {
    type: 'Марафон',
    title: 'Стройности',
    description: 'Короткий марафон для первого видимого результата, тонуса и легкости.',
    image: 'assets/slim.png',
    facts: ['21 день', 'Домашний формат', 'Подходит после паузы'],
  },
  'glutes-10': {
    type: 'Марафон',
    title: 'Упругая попа 1.0',
    description: 'Первый объем и подтянутость ягодиц без сложного оборудования.',
    image: 'assets/glutes-10.png',
    facts: ['Собственный вес', 'Акцент на ягодицы', 'Понятный вход'],
  },
  'glutes-20': {
    type: 'Марафон',
    title: 'Упругая попа 2.0',
    description: 'Следующий уровень нагрузки для плотных и упругих ягодиц.',
    image: 'assets/glutes-20.png',
    facts: ['Резинки и утяжелители', 'Прогрессия нагрузки', 'Для продолжающих'],
  },
  abs: {
    type: 'Марафон',
    title: 'Плоский живот',
    description: 'Работа с прессом, осанкой и глубокими мышцами живота.',
    image: 'assets/abs.png',
    facts: ['Глубокие мышцы', 'Тонус корпуса', 'Без погони за кубиками'],
  },
  fatburn: {
    type: 'Курс',
    title: 'Жиросжигающий',
    description: 'Интенсивный курс для рельефа, выносливости и снижения процента жира.',
    image: 'assets/fatburn.png',
    facts: ['6 недель', 'Интервальные нагрузки', 'Для подготовленного уровня'],
  },
  gym: {
    type: 'Курс',
    title: 'Для зала',
    description: 'Готовая программа для тренажерного зала, мышечного объема и силы.',
    image: 'assets/gym.png',
    facts: ['Тренажерный зал', 'Силовой прогресс', 'Готовый план занятий'],
  },
  pregnancy: {
    type: 'Курс',
    title: 'Для беременных',
    description: 'Бережные тренировки на всех триместрах с учетом самочувствия и безопасности.',
    image: 'assets/pregnancy.png',
    facts: ['Все триместры', 'Безопасная нагрузка', 'Подготовка к родам'],
  },
  postpartum: {
    type: 'Курс',
    title: 'Восстановление после родов',
    description: 'Постепенное возвращение в форму после родов и кесарева сечения.',
    image: 'assets/postpartum.png',
    facts: ['Мягкий старт', 'После родов', 'Возвращение тонуса'],
  },
};

const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionAllowed) {
  const revealItems = document.querySelectorAll('.program-card');

  revealItems.forEach((item) => {
    item.classList.add('reveal-on-scroll');
  });

  const revealVisibleCards = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains('is-visible')) {
        return;
      }

      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      }
    });
  };

  const requestRevealCheck = () => {
    revealVisibleCards();
  };

  revealVisibleCards();
  window.addEventListener('scroll', requestRevealCheck, { passive: true });
  window.addEventListener('resize', requestRevealCheck);
} else {
  document.querySelectorAll('.program-card').forEach((item) => {
    item.classList.add('is-visible');
  });
}

const buildPopup = document.querySelector('[data-build-popup]');
const buildPopupClose = document.querySelector('[data-build-popup-close]');

if (buildPopup && buildPopupClose) {
  buildPopup.hidden = false;

  const closeBuildPopup = () => {
    buildPopup.classList.add('is-closing');
    window.setTimeout(() => {
      buildPopup.hidden = true;
    }, 220);
  };

  buildPopupClose.addEventListener('click', closeBuildPopup);
}

const trustSlider = document.querySelector('[data-trust-slider]');

if (trustSlider) {
  trustSlider.querySelectorAll('.trust-slide').forEach((slide) => {
    slide.removeAttribute('aria-hidden');
  });
}

document.querySelectorAll('.faq-item__button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open');
      openItem.querySelector('.faq-item__button').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const detail = document.querySelector('#program-detail');

if (detail) {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('program') || 'method';
  const program = programs[key] || programs.method;

  document.title = `${program.title} - программа тренировок`;
  document.querySelector('#program-type').textContent = program.type;
  document.querySelector('#program-title').textContent = program.title;
  document.querySelector('#program-description').textContent = program.description;

  const image = document.querySelector('#program-image');
  image.src = program.image;
  image.alt = program.title;

  const note = document.querySelector('.program-detail__note');
  note.textContent = program.facts.join(' / ');
}
