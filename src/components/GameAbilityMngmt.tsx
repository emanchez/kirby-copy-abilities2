'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import Image from "next/image";

// load images 
const abilityImageLoader = (props: any) => {
    return `/ability-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}
const gameImageLoader = (props: any) => {
    return `/game-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}
// declare type for attributes of following component
type Props = { isAdmin: boolean }

// component to manage table for game-ability relationship and display data based on user priviledge level
const GameMngmt: FC<Props> = (props) => {
    // react hook
    const [gameAbilityRelationship, setRelationship] = React.useState({gameNo: 0, abilityNo: 0, id: null});
    // dexie hook to get data
    const gameAbilityArray = useLiveQuery(() => db.gameAbilities.toArray());
    //db.gameAbilities.clear()
    //add game-ability relationship

    // TODO: on this page: https://stackoverflow.com/questions/76003177/error-while-adding-new-record-without-explicit-key-using-auto-inc-key-instead
    // figure out a way to fix the dataerror issue by modifying the gameAbility table with a primary-key thats just the game name and ability name
    // concatenated together

    //add game-ability relationship
    const addRelationship = React.useCallback(async () => {
        console.log(gameAbilityRelationship)
        if (gameAbilityRelationship?.gameNo && gameAbilityRelationship?.abilityNo){
            await db.gameAbilities.add({
                gameNo:gameAbilityRelationship?.gameNo,
                abilityNo:gameAbilityRelationship?.abilityNo,
            });
            setRelationship({gameNo: 0, abilityNo: 0, id: null})
        }
    }, [gameAbilityRelationship]);

    //update game-ability relationship
    const updateRelationship = React.useCallback(async () => {
        if (gameAbilityRelationship?.gameNo && gameAbilityRelationship?.abilityNo){
            await db.gameAbilities.put({
                id:Number(gameAbilityRelationship?.id),
                gameNo:gameAbilityRelationship?.gameNo,
                abilityNo:gameAbilityRelationship?.abilityNo,
            });
            setRelationship({gameNo: 0, abilityNo: 0, id: null});
        }
    }, [gameAbilityRelationship])

    //delete game-ability relationshi[]
    const deleteRelationship = React.useCallback(async (id:any) => {
        await db.gameAbilities.delete(id);
    }, [])

    const TableHeadAdmin = () => { 
        return (
            <thead>
    
                <tr>
                    <th>ID</th>
                    <th>GAME</th>
                    <th>GAME IMG</th>
                    <th>ABILITY</th>
                    <th>ABILITY IMG</th>
                    <th>UPDATE</th>
                    <th>DELETE</th>
                </tr>
            </thead>
        );
    }
    const TableBodyAdmin = () => {
        return (
            <tbody>
                {
                    gameAbilityArray?.map((i: any, index: number) => {
                        console.log(i)
                        const game = useLiveQuery(() => db.games.get({id:i.gameNo}))
                        const ability = useLiveQuery(() => db.abilities.get({id:i.abilityNo}))
                        return (
                            <tr key={index}>
                                <td>{i.id}</td>
                                <td>{game?.name}</td>
                                <td><Image loader={gameImageLoader} src={game ? game.imgPath : "null"} width={500} height={500} alt={game ? game.name : "null"} /></td>
                                <td>{ability?.name}</td>
                                <td><Image loader={abilityImageLoader} src={ability ? ability.imgPath : "null"} width={500} height={500} alt={ability ? ability.name : "null"} /></td>
                                <td><button onClick={() => setRelationship({...i})}>UPDATE</button></td>
                                <td><button onClick={addRelationship} onClickCapture={() => deleteRelationship(i.id)}>DELETE</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        );
    }    
    const TableHeadReg = () => { 
        return (
            <thead>
                <tr>
                    <th>GAME NAME</th>
                    <th>GAME IMG</th>
                    <th>ABILITY NAME</th>
                    <th>ABILITY IMG</th>
                </tr>
            </thead>
        );
    }
    const TableBodyReg = () => {
        return (
            <tbody>
                {
                    gameAbilityArray?.map((i: any, index: number) => {
                        const game = useLiveQuery( () =>  db.games.get({id:i.gameNo}))
                        const ability = useLiveQuery( () =>  db.abilities.get({id:i.abilityNo}))
                        return (
                            <tr key={index}>
                                <td>{game?.name}</td>
                                <td><Image loader={gameImageLoader} src={game ? game.imgPath : "null"} width={500} height={500} alt={game ? game.name : "null"} /></td>
                                <td>{ability?.name}</td>
                                <td><Image loader={abilityImageLoader} src={ability ? ability.imgPath : "null"} width={500} height={500} alt={ability ? ability.name : "null"} /></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        );
    }    
    
    let tablehead, tablebody;
    if (props.isAdmin == true) {
        tablehead = <TableHeadAdmin />
        tablebody = <TableBodyAdmin />
    }
    else {
        tablehead = <TableHeadReg />
        tablebody = <TableBodyReg />
    }

    // ability list component

    const RelationshipList = () => {
        return (
            <div className="gameability-list">
                <table>
                    {tablehead}
                    {tablebody}
                </table>
            </div>
        )
    }

    const cleartable = async () => await db.gameAbilities.clear()

    if (props.isAdmin == true) {
        return (
            <>
                <div>
                    <div>
                        <button onClick={cleartable}>clearall</button>
                        <h2>{gameAbilityRelationship?.id ? 'Update' : 'Add'} Ability</h2>
                        <div>
                            <label htmlFor="GameNo">Game ID</label>
                            <input type="number" value={gameAbilityRelationship?.gameNo} onChange={(e) => setRelationship({...gameAbilityRelationship, gameNo: e.target.valueAsNumber})} placeholder="gameNo" name="gameNo" required />
                            <label htmlFor="AbilityNo">Ability ID</label>
                            <input type="number" value={gameAbilityRelationship?.abilityNo} onChange={(e) => setRelationship({...gameAbilityRelationship, abilityNo: e.target.valueAsNumber})} placeholder="abilityNo" name="abilityNo" required />
                            {
                                gameAbilityRelationship?.id ? (
                                    <button onClick={updateRelationship}>SUBMIT</button>
                                ) : (
                                    <button onClick={addRelationship}>ADD</button>
                                )
                            }
                        </div>

                    <div>
                        <RelationshipList />
                    </div>
                    </div>
                </div>
            </>
        );
    } 
    else {
        return (
            <div>
                <RelationshipList />
            </div>
        )
    }

}

export default GameMngmt;

