///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav=document.querySelector('.nav')


const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////
// const header=document.querySelector('.header');
// const allSections=document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('#section--1');
// const allButtons=document.getElementsByName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));


// //CREATING and SORTING elements
// //.insertAdjacentHTML

// const message=document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent='We use cookies for improved analytics and functionlaity.';
// message.innerHTML='We use cookies for improved analytics and functionlaity. <button class="btn btn--close-cookie">GOT IT</button>';


// //header.prepend(message);
// header.append(message)
// //header.append(message.cloneNode(true));
// //header.before(message)


// //DELETE elements
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//     message.remove();
// })

// message.style.backgroundColor='#37383d';
// message.style.width='120%';

// document.documentElement.style.setProperty('--color-primary','orangered');

//--------------------------------


//EVENT DELEGATION



// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
nav.addEventListener('mouseover',function(e){
    
})

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));



//STICKY NAVIGATION
window.onscroll = function() {
  stickyNavbar();
};

const navbar = document.querySelector(".nav");
const header=document.querySelector('.header');
//const sticky = navbar.offsetTop;
const sticky=header.offsetHeight;


function stickyNavbar() {
  if (window.scrollY > sticky) {
      navbar.classList.add("sticky");
  } else {
      navbar.classList.remove("sticky");
  }
}

//Revealing sections on scroll
window.addEventListener('scroll',function(){
  const sections=document.querySelectorAll('.section');

  sections.forEach(section=>{
    const windowHeight=window.innerHeight;
    const sectionTop=section.getBoundingClientRect().top;

    if(sectionTop<windowHeight){
      section.classList.remove('section--hidden')
    }
  })
})

//Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('.lazy-img');

  const lazyLoad = () => {
      lazyImages.forEach(img => {
          if (img.getBoundingClientRect().top < window.innerHeight) {
              img.src = img.dataset.src; 
              img.classList.remove('lazy-img'); 
          }
      });
  };

  window.addEventListener('scroll', lazyLoad);
  lazyLoad(); 
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
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
};
slider();