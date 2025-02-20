
'use client'
import React, { FC, useState } from 'react';
import AbilityMngmt from "@/components/AbilityMngmt";
import GameMngmt from "@/components/GameMngmt";
import GameAbilityMngmt from './GameAbilityMngmt';



type Props = { isAdmin: boolean }

const DBTables: FC<Props> = (props) => {

    const [currentIdx, setCurrentIdx] = useState(0);
    
    const currentTable = () => {
        switch (currentIdx) {
            default:
                return (<AbilityMngmt isAdmin={props.isAdmin} />);
            case 0:
                return (<AbilityMngmt isAdmin={props.isAdmin} />);
            case 1:
                return (<GameMngmt isAdmin={props.isAdmin} />);
            case 2:
                return (<GameAbilityMngmt isAdmin={props.isAdmin} />);
        }
    }

    const setCurrent = (idx: number) => {
        setCurrentIdx(idx);
    }

    return (
        <>
            <div>
                <button onClick={()=>setCurrent(0)}>Abilities</button>
                <button onClick={()=>setCurrent(1)}>Games</button>
                <button onClick={()=>setCurrent(2)}>Relationships</button>
            </div>
            <div>
                {currentTable()}
            </div>
        </>
    )
}


export default DBTables;