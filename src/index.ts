import { draw } from './ui';
import { changeDirection, generateInitialState, nextState } from './engine';

const canvas = document.querySelector('#field') as HTMLCanvasElement;
let state = generateInitialState();
let lastTick = new Date().valueOf();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        state = changeDirection(state, 'up');
    } else if (event.key === 'ArrowDown') {
        state = changeDirection(state, 'down');
    } else if (event.key === 'ArrowLeft') {
        state = changeDirection(state, 'left');
    } else if (event.key === 'ArrowRight') {
        state = changeDirection(state, 'right');
    }
});

const tick = () => {
    draw(canvas, state);

    const now = new Date();

    if (!lastTick || now.valueOf() - lastTick > 300) {
        state = nextState(state);
        lastTick = now.valueOf();
    }

    if (state.gameOver) {
        alert('Game over');
        return;
    }

    window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
