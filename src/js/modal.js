const btnOpen = document.querySelector('.header__btn');
const modal = document.querySelector('.modal');
const btnClose = modal.querySelector('.form-modal__btn-close');

btnOpen.addEventListener('click', toggleModal);

modal.addEventListener('click', e => {
  if (e.target === modal) toggleModal();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  toggleModal();
});

function toggleModal() {
  modal.classList.toggle('d-none');
}
