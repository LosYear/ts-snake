import { COLUMNS, Coordinate, Direction, ROWS } from './domain';

export const mapDirectionToXY = (direction: Direction): Coordinate => {
    const mapping = {
        down: { x: 0, y: 1 },
        up: { x: 0, y: -1 },
        right: { x: 1, y: 0 },
        left: { x: -1, y: 0 },
    };

    return mapping[direction];
};

export const sumCoords = (a: Coordinate, b: Coordinate) => ({
    x: a.x + b.x,
    y: a.y + b.y,
});

export const mod = (a: number, base: number) => ((a % base) + base) % base;

export const moduloByFieldSize = ({ x, y }: Coordinate) => ({
    x: mod(x, COLUMNS),
    y: mod(y, ROWS),
});

export const includesCoordinates = (array: Array<Coordinate>, { x, y }: Coordinate) =>
    !!array.find((el) => el.x === x && el.y === y);

export const generateRandom = (from: number, to: number) => Math.floor(Math.random() * (to - from) + from);

export const generateRandomCoords = (): Coordinate => ({ x: generateRandom(0, COLUMNS), y: generateRandom(0, ROWS) });
