/* eslint-disable no-unused-vars */
const formFeedback = document.querySelector('.form-feedback');
const formModal = document.querySelector('.form-modal');

formFeedback.addEventListener('submit', e => {
  e.preventDefault();
  const inputName = formFeedback.querySelector('#form-feedback__input--name');
  const inputSurname = formFeedback.querySelector(
    '#form-feedback__input--surname'
  );
  const inputTel = formFeedback.querySelector('#form-feedback__input--tel');
  const inputEmail = formFeedback.querySelector('#form-feedback__input--email');

  [inputName, inputSurname, inputTel, inputEmail].forEach(input =>
    input.classList.remove('error')
  );

  let validFormState = {
    name: isValidFullname(inputName),
    surname: isValidFullname(inputSurname),
    tel: isValidTel(inputTel),
    email: isValidEmail(inputEmail),
  };

  if (isValidForm(validFormState)) {
    [inputName, inputSurname, inputTel, inputEmail].forEach(
      input => (input.value = '')
    );
  }
});

formModal.addEventListener('submit', e => {
  e.preventDefault();
  const inputName = formModal.querySelector('#form-modal__input--name');
  const inputTel = formModal.querySelector('#form-modal__input--tel');
  const inputEmail = formModal.querySelector('#form-modal__input--email');

  [inputName, inputTel, inputEmail].forEach(input =>
    input.classList.remove('error')
  );

  let validFormState = {
    name: isValidFullname(inputName),
    tel: isValidTel(inputTel),
    email: isValidEmail(inputEmail),
  };

  if (isValidForm(validFormState)) {
    [inputName, inputTel, inputEmail].forEach(input => (input.value = ''));
  }
});

function isValidForm(validFormState) {
  let isValid = true;

  for (const bool in validFormState) {
    if (!validFormState[bool]) {
      isValid = false;
    }
  }

  return isValid;
}

function isValidFullname(input) {
  const value = input.value.trim();
  const reg = /[a-zа-я\\-]/i;

  if (value.length === 0) {
    setErrorMessage(input, 'Поле обязательно для заполнения');
    return false;
  }

  if (value.length < 2) {
    setErrorMessage(input, 'Не менее 2 символов');
    return false;
  }

  if (!reg.test(value)) {
    setErrorMessage(input, 'Только латиница или кириллица');
    return false;
  }

  return true;
}

function isValidEmail(input) {
  const reg = /[a-z0-9_\\-\\.]+@[a-z0-9_\\-\\.]+\.[a-z0-9]/i;
  const value = input.value.trim();

  if (value.length === 0) {
    setErrorMessage(input, 'Поле обязательно для заполнения');
    return false;
  }

  if (!reg.test(value)) {
    setErrorMessage(input, 'Введен некорректный Email');
    return false;
  }
  return true;
}

function isValidTel(input) {
  const value = input.value.trim();

  if (value.length === 0) {
    setErrorMessage(input, 'Поле обязательно для заполнения');
    return false;
  }

  if (value.length !== 18) {
    setErrorMessage(input, 'Номер телефона должен состоять из 10 цифр');
    return false;
  }
  return true;
}

function setErrorMessage(input, text) {
  const errEl = input.nextElementSibling;

  input.classList.add('error');
  errEl.textContent = text;
}
