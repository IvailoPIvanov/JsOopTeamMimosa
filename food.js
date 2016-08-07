/**
 * Constats
 */

var
    SNAKE = 1,
    FRUIT = 2;

/**
 * Set a food id at a random free cell in the grid
 */
function setFood() {
    var empty = [];
    /**
     *  iterate through the grid and find all empty cells
     */
    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            if (grid.get(x, y) === EMPTY) {
                empty.push({
                    x: x,
                    y: y
                });
            }
        }
    }
    /**
     *  chooses a random cell
     */
    var randpos = empty[Math.round(Math.random() * (empty.length - 1))];
    grid.set(FRUIT, randpos.x, randpos.y);
}
/**
 * check wheter the new position are on the fruit item
 */

if (grid.get(nx, ny) === FRUIT) {
    /**
     *  increment the score and sets a new fruit position
     */
    score++;
    setFood();
} else {
    /**
     *  take out the first item from the snake queue i.e
     *  the tail and remove id from grid
     */

    var tail = snake.remove();
    grid.set(EMPTY, tail.x, tail.y);

    /**
     *  add a snake id at the new position and append it to
     * the snake queue
     */
    grid.set(SNAKE, nx, ny);
    snake.insert(nx, ny);
}


function draw() {
    /**
     *calculate tile-width and -height
     */
    var tileWidth = canvas.width / grid.width;
    var tileHeight = canvas.height / grid.height;
    /**
     * iterate through the grid and draw all cells
     */
    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            /** sets the fillstyle depending on the id of
             *each cell
             */
            switch (grid.get(x, y)) {
                case EMPTY:
                    ctx.fillStyle = "#000";
                    break;
                case SNAKE:
                    ctx.fillStyle = "#aaa";
                    break;
                case FRUIT:
                    ctx.fillStyle = "#f00";
                    break;
            }
            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
}