export const COLUMNS = 20;
export const ROWS = 20;

export type Direction = 'up' | 'down' | 'right' | 'left';

export type Coordinate = { x: number; y: number };

export type Food = Array<Coordinate>;

export type Snake = Array<Coordinate>;

export type State = {
    direction: Direction;
    gameOver: boolean;
    food: Food;
    snake: Snake;
};
