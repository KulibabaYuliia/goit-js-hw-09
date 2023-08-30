import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(currentTime, 1000));

function currentTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
