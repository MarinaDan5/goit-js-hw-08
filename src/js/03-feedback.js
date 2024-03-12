import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const { email, message } = form;

const formData = {
  email: email.value,
  message: message.value,
};

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);
reloadPage();

function onInputData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log('formData', formData);
  localStorage.removeItem('feedback-form-state');
  email.value = '';
  message.value = '';
}

function reloadPage() {
  const data = localStorage.getItem('feedback-form-state');
  if (data) {
    const parseData = JSON.parse(data);
    console.log('parseData', parseData);
    email.value = parseData.email;
    message.value = parseData.message;
  }
}
