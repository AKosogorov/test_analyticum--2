const burger = document.getElementById('burger');

burger.addEventListener('click', () => {
  burger.nextElementSibling.classList.toggle('is-active');
});
