const CreateBoard = (mapSize, bombsAmount) => {

    let mineLocation = [];
    
    // create 2d array
    let board = new Array(mapSize);
    for(let i=0; i < mapSize; i++) {
        board[i] = new Array(mapSize);
    }

    // initialize board
    for(let i=0; i < mapSize; i++) {
        for(let j=0; j < mapSize; j++) {
            board[i][j] = {
                value: 0,
                flagged: false,
                revealed: false,
                x: i,
                y: j,
            }
        }
    }

    // initialize bombs on the board
    for(let i=0; i<bombsAmount; i++) {
        let x = generateBomb(mapSize);
        let y = generateBomb(mapSize);
        board[x][y].value = 'B';
        mineLocation.push([x,y]);
    }

    //set cell values (determine how much neighbors are bombs)
    for(let i=0; i < mapSize; i++) {
        for(let j=0; j < mapSize; j++) {
            
            if(board[i][j].value === 0) {
                for(let k= -1; k <=1; k++)
                    for(let l= -1; l <=1; l++)
                        if(checkCoords(i+k, j+l, mapSize) && board[i+k][j+l].value === 'B' && ( k !== 0 || l !== 0))
                            board[i][j].value++;
            }
        }
    }
    return {board, mineLocation};
}

const checkCoords = (x, y, mapSize) => {
    if(x >= 0 && x < mapSize && y >= 0 && y < mapSize){
        return true;
    }
    else{
        return false;
    }
}

const generateBomb = (mapSize) => {
    return Math.floor(Math.random() * mapSize);
}

export default CreateBoard;