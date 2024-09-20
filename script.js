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