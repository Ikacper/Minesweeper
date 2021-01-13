import React from 'react';
import styles from './index.module.css'

const Cell = ({properties, updateFlag, revealCell}) => {

    return(
        <div className={ `${properties.revealed ? styles.revealedCell : styles.hiddenCell}
         ${properties.value === 1 ? styles.value1 : properties.value === 2 ? styles.value2 : 
            properties.value === 3 ? styles.value3 : properties.value === 4 ? styles.value4 : 
            properties.value === 5 ? styles.value5 : ""} ${(properties.value === 'B' && properties.revealed===true) ? styles.valueBomb : ""}` }
             onClick={()=> revealCell(properties.x, properties.y)} 
            onContextMenu={(e) => updateFlag(e, properties.x, properties.y)}>
            {!properties.revealed && properties.flagged ? '🚩' : properties.revealed ? properties.value === 0 ? "": properties.value  : ""}
        </div>
    );
}

export default Cell