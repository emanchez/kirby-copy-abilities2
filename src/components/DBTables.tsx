
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
            <div className='mb-6'>
                <div className='flex space-x-2 border-b border-gray-200 pb-2'>
                    <button 
                        onClick={()=>setCurrent(0)} 
                        className={`px-4 py-4 rounded-t-lg font-medium transition-colors ${currentIdx === 0 ? 
                            'bg-white text-black border-t border-l boreder-r border-gray-200' : 
                            'text-white hover:bg-gray-500'}`}
                    >
                        Abilities
                    </button>
                    <button 
                        onClick={()=>setCurrent(1)}
                        className={`px-4 py-4 rounded-t-lg font-medium transition-colors ${currentIdx === 1 ? 
                            'bg-white text-black border-t border-l boreder-r border-gray-200' : 
                            'text-white hover:bg-gray-500'}`}
                    >Games
                    </button>
                    <button 
                        onClick={()=>setCurrent(2)}
                        className={`px-4 py-4 rounded-t-lg font-medium transition-colors ${currentIdx === 2 ? 
                            'bg-white text-black border-t border-l boreder-r border-gray-200' : 
                            'text-white hover:bg-gray-500'}`}
                    >
                    Relationships
                    </button>
                </div>
                <div>
                    {currentTable()}
                </div>
            </div>
        </>
    )
}


export default DBTables;