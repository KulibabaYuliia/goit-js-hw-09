import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.querySelector("input[name = 'email']");
const messageEl = formEl.querySelector("textarea[name = 'message']");

let feedback = {
  email: '',
  message: '',
};

formEl.addEventListener('input', throttle(onFormInputHandler, 500));

function onFormInputHandler() {
  feedback.email = emailEl.value;
  feedback.message = messageEl.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(feedback));
}

function setFormValues() {
  if (!localStorage.getItem('feedback-form-state')) {
    return;
  }
  emailEl.value = JSON.parse(localStorage.getItem('feedback-form-state')).email;
  messageEl.value = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ).message;
}

setFormValues();

formEl.addEventListener('submit', e => {
  e.preventDefault();

  if (emailEl.value === '' || messageEl.value.trim() === '') {
    alert('All fileld should be filled');
  } else {
    feedback.email = emailEl.value;
    feedback.message = messageEl.value;
    console.log(feedback);

    formEl.reset();
    localStorage.removeItem('feedback-form-state');
    feedback = {};
  }
});
