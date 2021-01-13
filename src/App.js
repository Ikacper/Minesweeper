import React, { useState, useEffect } from 'react';

import styles from './index.module.css';

import difficultyLevels from './difficultyLevels.json';
import mapSizes from './mapSizes.json';

import Board from './components/Board/index';
import StopWatch from './components/StopWatch/index'

 
const App = () => { 

    const [difficulty, setDifficulty] = useState(2);
    const [mapSize, setMapSize] = useState(2);

    const [restart, setRestart] = useState(false);
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.game}>

                <ConsoleBoard 
                setDifficulty={setDifficulty} 
                setMapSize={setMapSize} 
                mapSize={mapSize}
                difficulty={difficulty} 
                restart={restart}
                setRestart={setRestart}
                />

                <Board 
                difficulty={difficulty} 
                mapSize={mapSize}
                restart={restart}
                setRestart={setRestart}
                />

             </div>
        </div>
    );
}


const ConsoleBoard = ({setDifficulty, setMapSize, mapSize, difficulty, restart, setRestart}) => {

    function refreshPage() {
        window.location.reload(false);
    }
    
    return(
        <div className={styles.console}>

            <div className={styles.consoleItem}>

                <label className={styles.label}>Difficulty</label>
                <input type="range" min="0" max="2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={styles.slider}></input>
                <div className={styles.rangeText}>
                    {difficultyLevels[difficulty].difficulty}
                </div>

                <label className={styles.label}>Map size</label>
                <input type="range" min="0" max="2" value={mapSize} onChange={(e) => setMapSize(e.target.value)} className={styles.slider}></input>
                <div className={styles.rangeText}>
                    {mapSizes[mapSize].size}
                </div>

            </div>

            <div className={styles.consoleItem}>
                <button  className={styles.button} type="button" onClick={refreshPage} ></button>
            </div>

            <div className={styles.consoleItem}>
                <StopWatch 
                restart={restart}/>
            </div>

           
        </div>
    );
}


export default App;