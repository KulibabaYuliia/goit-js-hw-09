import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const flatpickrEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const timerEl = document.querySelector('.timer');

startBtn.setAttribute('disabled', 'true');

flatpickr(flatpickrEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled');

      startBtn.addEventListener('click', () => {
        const timerId = setInterval(() => {
          const difference =
            Date.parse(selectedDates[0]) - Date.parse(new Date());
          const differenceObj = convertMs(difference);

          if (difference < 1) {
            clearInterval(timerId);
          }

          const { days, hours, minutes, seconds } = differenceObj;

          daysEl.textContent = addLeadingZero(days);
          hoursEl.textContent = addLeadingZero(hours);
          minutesEl.textContent = addLeadingZero(minutes);
          secondsEl.textContent = addLeadingZero(seconds);
        }, 1000);
      });
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}