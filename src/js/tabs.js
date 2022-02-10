const btnPersonal = document.querySelector('.feedback__btn--personal');
const btnRules = document.querySelector('.feedback__btn--rules');
const form = document.querySelector('.feedback__form');
const rules = document.querySelector('.feedback__rules');

btnPersonal.addEventListener('click', () => {
  btnRules.classList.remove('is-active');
  btnPersonal.classList.add('is-active');
  rules.classList.add('d-none');
  form.classList.remove('d-none');
});

btnRules.addEventListener('click', () => {
  btnPersonal.classList.remove('is-active');
  btnRules.classList.add('is-active');
  form.classList.add('d-none');
  rules.classList.remove('d-none');
});
