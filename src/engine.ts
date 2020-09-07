import { generateRandomCoords, includesCoordinates, mapDirectionToXY, moduloByFieldSize, sumCoords } from './helpers';
import { Coordinate, Direction, Food, Snake, State } from './domain';

const willCollideWithSelf = (prevState: State): boolean => includesCoordinates(prevState.snake, nextHead(prevState));

const willEat = (prevState: State): boolean => includesCoordinates(prevState.food, nextHead(prevState));

const forceDirection = ({ direction, snake }: State, newDirection: Direction) => {
    if (snake.length === 1) {
        return newDirection;
    }

    if (
        (direction === 'up' && newDirection === 'down') ||
        (direction === 'down' && newDirection === 'up') ||
        (direction === 'left' && newDirection === 'right') ||
        (direction === 'right' && newDirection === 'left')
    ) {
        return direction;
    }

    return newDirection;
};

const nextHead = ({ snake, direction }: State): Coordinate => {
    const mappedDirection = mapDirectionToXY(direction);
    const currentHead = snake[snake.length - 1];

    return moduloByFieldSize(sumCoords(currentHead, mappedDirection));
};

const nextSnake = (prevState: State): Snake => {
    const { snake } = prevState;
    const newHead = nextHead(prevState);
    const ateFood = willEat(prevState);
    const dropTail = ateFood ? 0 : 1;

    return [...snake.slice(dropTail), newHead];
};

const nextFood = (prevState: State): Food => {
    const { food } = prevState;
    const newHead = nextHead(prevState);
    const ateFood = willEat(prevState);

    if (!ateFood) {
        return food;
    }

    const newFood = food.filter(({ x, y }) => x !== newHead.x || y !== newHead.y);

    return [...newFood, generateRandomCoords()];
};

export const nextState = (prevState: State): State => ({
    direction: prevState.direction,
    snake: nextSnake(prevState),
    gameOver: willCollideWithSelf(prevState),
    food: nextFood(prevState),
});

export const changeDirection = (prevState: State, newDirection: Direction): State => ({
    ...prevState,
    direction: forceDirection(prevState, newDirection),
});

export const generateInitialState = (): State => ({
    direction: 'right',
    gameOver: false,
    food: [generateRandomCoords(), generateRandomCoords()],
    snake: [generateRandomCoords()],
});
