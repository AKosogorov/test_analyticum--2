/* eslint-disable no-undef */
const inputPhone = document.querySelectorAll('input[type="tel"]');
const maskTel = new Inputmask('+7 (999) 999-99-99', {
  placeholder: ' ',
});
inputPhone.forEach(input => {
  maskTel.mask(input);
});
