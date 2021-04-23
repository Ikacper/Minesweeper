import React, { useState } from 'react';
import styles from './index.module.css'

const Cell = ({properties, updateFlag, revealCell}) => {
    

    const [flag, setFlag] = useState(false)

    let stylesOption = '';
    if(properties.value === 1) {
        stylesOption = styles.value1;
    }else if (properties.value === 2){
        stylesOption = styles.value2;
    }else if (properties.value === 3){
        stylesOption = styles.value3;
    }else if (properties.value === 4){
        stylesOption = styles.value4;
    }else if (properties.value === 5){
        stylesOption = styles.value5;
    }

    let cellValue = ''
    if(!properties.revealed && properties.flagged){
        cellValue = '🚩'
    }
    else if( properties.revealed && properties.value  > 0) {
        cellValue = properties.value
    }

    return(
        <div className={ `${properties.revealed ? styles.revealedCell : styles.hiddenCell} ${stylesOption}
         ${(properties.value === 'B' && properties.revealed===true) ? styles.valueBomb : ""}` }
             onClick={()=> revealCell(properties.x, properties.y)} 
            onContextMenu={(e) => {
                if(flag) {
                    setFlag(!flag)
                    updateFlag(e, properties.x, properties.y, false)
                    
                }else {
                    setFlag(!flag)
                    updateFlag(e, properties.x, properties.y, true)                   
                }}}>
            {cellValue}
        </div>
    );
}

export default Cell