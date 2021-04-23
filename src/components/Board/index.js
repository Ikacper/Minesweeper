import React, {useEffect, useState} from 'react';
import createBoard from '../../utils/CreateBoard';
import Reveal from '../../utils/Reveal';
import Cell from '../Cell/index';
import styles from './index.module.css';

import difficultyLevels from '../../difficultyLevels.json';
import mapSizes from '../../mapSizes.json';

const Board = ({ difficulty, mapSize, buttonText, setButtonText}) => {

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState({val: 0});
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect( () => {
        const newBoard = createBoard(mapSizes[mapSize].value, difficultyLevels[difficulty].value);
        setNonMineCount({val: mapSizes[mapSize].value*mapSizes[mapSize].value-difficultyLevels[difficulty].value});
        setGrid(newBoard.board);

        setMineLocations(newBoard.mineLocation);
    },[difficulty, mapSize, setGrid])

    const updateFlag = (e,x,y,flag) => {
        e.preventDefault();

        let newGrid = JSON.parse(JSON.stringify(grid));
        if(flag){
            newGrid[x][y].flagged = true;
            setGrid(newGrid);
        }
        else {
            newGrid[x][y].flagged = false;
            setGrid(newGrid);
        }
        
    }

    const revealCell = (x,y) => {
        if(grid[x][y].revealed || gameOver){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === 'B') {

            for(let i=0; i < mineLocations.length; i++){
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);

        } else {
            
            let revealed = Reveal(newGrid, x, y, mapSizes[mapSize].value, nonMineCount);
            setGrid(revealed.grid)
            setNonMineCount({val: revealed.nonMineCount.val})
            if(revealed.nonMineCount.val === 0) {
                setGameOver(true);
            }
        }

    }

   

    return(
        <>
        <p className={styles.gameOverText}>{gameOver ? "game over" : ""}</p>
        <div className={styles.board}>
            {grid.map(n => 
                <div className={styles.row}>
                    {n.map(element => 
                        {return <Cell properties={element} updateFlag={updateFlag} revealCell={revealCell}/>}
                    )}
                </div>
            )}
        </div>
    </>
    );
}

export default Board;