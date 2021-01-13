import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const StopWatch = ({restart}) => {
    let seconds = 0;

    const [time, setTime] = useState(seconds);

   
    
    useEffect(() => {
        
        if (restart === false) 
        {
            const intervalId = setInterval(() => {
                setTime(time + 1);
                }, 1000);
                
                // clear interval on re-render to avoid memory leaks
                return () => clearInterval(intervalId);
        }
        if(restart)
        setTime(0);

    }, [time,restart]);

    return(
        <div className={styles.stopWatch}>
            {time}
            <div className={styles.stopWatchSVG}>
                
            </div>
        </div>
    );
}

export default StopWatch