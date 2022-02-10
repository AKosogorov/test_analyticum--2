const inputFile = document.getElementById('form-feedback__input--upload');
const img = document.querySelector('.form-feedback__upload-img');

inputFile.addEventListener('input', () => {
  showFile(inputFile);
});

function showFile(input) {
  const file = input.files[0];
  const url = URL.createObjectURL(file);
  img.src = url;
}
