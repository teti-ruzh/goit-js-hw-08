import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onSaveCurrentTime, 1000));

function onSaveCurrentTime({duration, seconds}) {
localStorage.setItem(STORAGE_KEY, seconds);
if(duration === seconds) {
    localStorage.removeItem(STORAGE_KEY);
}
};

player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0.0).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});