'use strict';

/********* Navigation ********/

///////////////////////////////////////
// Sticky Navigation

// variables
const heroDOM = document.querySelector('.hero');
const navDOM = document.querySelector('.navigation');
const navHeight = navDOM.getBoundingClientRect().height;
const portMediaQuery = window.matchMedia('(max-width: 900px)');

// functionality
const stickyNav = entries => {
  const [entry] = entries;

  if (portMediaQuery.matches) return;

  if (!entry.isIntersecting) {
    navDOM.classList.add('sticky');
  } else navDOM.classList.remove('sticky');
};

//observer
const navigationObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navigationObserver.observe(heroDOM);

///////////////////////////////////////
// Burger Exit

//variables
const burgerDOM = document.querySelector('.burger__checkbox');
const burgerLinkDOM = document.querySelector('.burger__list');

//event listener
burgerLinkDOM.addEventListener('click', function (e) {
  e.preventDefault();
  burgerDOM.checked = false;
});

/********* Scrolling ********/

////////////////////////////////////////
// Navigation Scrolling

//variables
const navListDOM = document.querySelector('.navigation__list');

//event listener
navListDOM.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('navigation__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Button Scrolling

//variables
const heroBtnDOM = document.querySelector('.hero__btn');

const smoothScrolling = e => {
  // need closest due to line designs
  const buttonClicked = e.target.closest('.hero__btn');

  e.preventDefault();
  const id = buttonClicked.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

// event listener
heroBtnDOM.addEventListener('click', smoothScrolling);

/********* Carousel ********/

///////////////////////////////////////
// Slider
const slider = () => {
  //variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // functionality
  const createDots = () => {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Prev Slide
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // Timer
  const timer = () => {
    for (let i = 0; i < 7; i++) {
      setTimeout(nextSlide, 7000 + i * 7000);
    }
  };
  timer();
};

///////////////////////////////////////
// Play Slider

//variables
const sliderDOM = document.querySelector('.slider');

//functionality
const playSlider = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  setTimeout(slider, 1000);
  observer.unobserve(entry.target);
};

//observer
const sliderObserver = new IntersectionObserver(playSlider, {
  root: null,
  threshold: 0.15,
});

sliderObserver.observe(sliderDOM);

/********* Animations ********/

///////////////////////////////////////
//  Reveal Accordions

//variables
const slides = document.querySelectorAll('.slide');

//functionality
const revealAccordion = (entries, observer) => {
  const [entry] = entries;
  const addAccordion = () => {
    entry.target.classList.add('reveal-accordion');
  };
  const removeAccordion = () => {
    entry.target.classList.remove('reveal-accordion');
  };

  if (!entry.isIntersecting) return;

  setTimeout(addAccordion, 3000);
  setTimeout(removeAccordion, 7000);
  observer.unobserve(entry.target);
};

//observer
const slideObserver = new IntersectionObserver(revealAccordion, {
  root: null,
  threshold: 0.15,
});

//preset
slides.forEach(section => {
  slideObserver.observe(section);
});

///////////////////////////////////////
//  Reveal Sections

//variables
const allSectionsDom = document.querySelectorAll('.reveal-section');

//functionality
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden-section');
  observer.unobserve(entry.target);
};

//observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//preset
allSectionsDom.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('hidden-section');
});

///////////////////////////////////////
// Animate Cards

//variables
const cardsDOM = document.querySelector('.cards');

//functionality
const animateCards = (entries, observer) => {
  const [entry] = entries;

  const pickCard = () => entry.target.children[0].classList.add('pick-card');
  const returnCard = () =>
    entry.target.children[0].classList.remove('pick-card');

  if (!entry.isIntersecting) return;

  setTimeout(pickCard, 2000);

  // Reset
  observer.unobserve(entry.target);
  setTimeout(returnCard, 6000);
};

//observer
const cardsObserver = new IntersectionObserver(animateCards, {
  root: null,
  threshold: 1,
});

//preset
cardsObserver.observe(cardsDOM);

///////////////////////////////////////
// Animate Saul

//variables
const saulAboutDOM = document.querySelector('.about__img');
const saulBookDOM = document.querySelector('.book__img');

//functionality
const moveSaul = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Matching strategy
  if (entry.target.classList.contains('about__img')) {
    entry.target.classList.remove('hidden');
    entry.target.classList.add('move-in--right');
  }

  if (entry.target.classList.contains('book__img')) {
    entry.target.classList.remove('hidden');
    entry.target.classList.add('move-in--left');
  }

  observer.unobserve(entry.target);
};

//observer
const saulObserver = new IntersectionObserver(moveSaul, {
  root: null,
  threshold: 1,
});

//preset
saulObserver.observe(saulAboutDOM);
saulAboutDOM.classList.add('hidden');

saulObserver.observe(saulBookDOM);
saulBookDOM.classList.add('hidden');

///////////////////////////////////////
// Send Letter
const formDOM = document.querySelector('.form');
const formBtnDOM = document.querySelector('.form__btn');

const sendLetter = e => {
  e.preventDefault();
  formDOM.classList.add('sent');
};

// event listener
formBtnDOM.addEventListener('click', sendLetter);

// Animate Letter

// functionality
const animateLetter = (entries, observer) => {
  const [entry] = entries;

  const sendLetter = () => {
    formDOM.classList.add('sent-intro');
  };
  const returnLetter = () => {
    formDOM.classList.remove('sent-intro');
    formDOM.classList.add('reveal');
  };

  if (!entry.isIntersecting) return;

  setTimeout(sendLetter, 2000);
  setTimeout(returnLetter, 5000);

  observer.unobserve(entry.target);
};

//observer
const letterObserver = new IntersectionObserver(animateLetter, {
  root: null,
  threshold: 1,
});

//preset
letterObserver.observe(formDOM);

console.log('TEST');
