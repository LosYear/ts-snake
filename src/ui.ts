import { COLUMNS, Coordinate, Food, ROWS, State } from './domain';

const backgroundColor = 'rgb(255, 255, 255)';
const gridColor = '#e4e3e3';
const foodColor = '#f37121';
const snakeColor = '#96bb7c';

type DrawingContext = {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
};

const drawLine = (context: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
};

const drawBackground = ({ context, width, height }: DrawingContext) => {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
};

const drawGrid = ({ context, width, height }: DrawingContext) => {
    context.strokeStyle = gridColor;
    context.lineWidth = 1;

    for (let row = 1; row < ROWS; row++) {
        const y = (row * width) / ROWS;
        drawLine(context, 0, y, width, y);
    }

    for (let column = 1; column < COLUMNS; column++) {
        const x = (column * height) / COLUMNS;
        drawLine(context, x, 0, x, height);
    }
};

export const fillCell = ({ width, height, context }: DrawingContext, { x, y }: Coordinate, fill: string) => {
    const cellWidth = width / COLUMNS;
    const cellHeight = height / ROWS;

    context.fillStyle = fill;
    context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
};

export const drawFood = (ctx: DrawingContext, food: Food) => {
    food.forEach((element) => fillCell(ctx, element, foodColor));
};

export const drawSnake = (ctx: DrawingContext, food: Food) => {
    food.forEach((element) => fillCell(ctx, element, snakeColor));
};

export const draw = (canvas: HTMLCanvasElement, { food, snake }: State) => {
    const { width, height } = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    drawBackground({ width, height, context });
    drawGrid({ width, height, context });
    drawFood({ width, height, context }, food);
    drawSnake({ width, height, context }, snake);
};
