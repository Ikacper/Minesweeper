const Reveal = (grid, x, y, mapSize, nonMineCount) => {

    if(grid[x][y].value === 0)
    {
        for(let i=-1; i <= 1; i++)
        for(let j=-1; j <= 1; j++)
        {
            if(checkCoords(x+i,y+j, mapSize) && grid[x+i][y+j].revealed === false){
                  nonMineCount.val--;
                grid[x+i][y+j].revealed = true;
                if(grid[x+i][y+j].value === 0) {        
                    Reveal(grid, x+i,y+j,mapSize, nonMineCount)
                }          
            }
        }
    }
    else {
        if(grid[x][y].revealed === false)
        {
            grid[x][y].revealed = true;
            nonMineCount.val--;
        }
    }
    return {grid, nonMineCount};
}

const checkCoords = (x, y, mapSize) => {
    if(x >= 0 && x < mapSize && y >= 0 && y < mapSize){
        return true;
    }
    else{
        return false;
    }
}

export default Reveal;