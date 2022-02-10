const select = document.querySelector('.form-feedback__selected');
select.addEventListener('click', selectToggle);

const options = document.querySelectorAll('.form-feedback__option');
options.forEach(option => option.addEventListener('click', selectChoiceOption));

function selectToggle() {
  this.parentElement.classList.toggle('is-active');
}

function selectChoiceOption() {
  const value = this.textContent;
  const select = this.closest('.form-feedback__select');
  const selectedValue = select.querySelector('.form-feedback__selected');

  selectedValue.textContent = value;
  select.classList.remove('is-active');
}
