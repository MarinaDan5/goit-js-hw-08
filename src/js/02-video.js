const iframe = document.querySelector('iframe');
import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const player = new Player(iframe, {
  loop: true,
  fullscreen: true,
  quality: '1080p',
});

player.on('timeupdate', throttle(onPlay, 500));

function onPlay({ seconds }) {
  let recordingTime = 0;
  let currentTime = seconds;

  if (!recordingTime) {
    recordingTime = currentTime;

    localStorage.setItem('videoplayer-current-time', recordingTime);
  }
}

let recordingStartTime = localStorage.getItem('videoplayer-current-time');

player.on('loaded', function () {
  if (recordingStartTime) {
    player
      .setCurrentTime(recordingStartTime)
      .then(function (seconds) {
        console.log('Відновлено відтворення з позиції ' + seconds + ' секунд');
      })
      .catch(function (error) {
        console.error('Помилка встановлення часу відтворення:', error);
      });
  }
});
