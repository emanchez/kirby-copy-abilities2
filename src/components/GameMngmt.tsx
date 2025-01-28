'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import Image from "next/image";


const imageLoader = (props: any) => {
    return `/game-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}

type Props = { isAdmin: boolean }

const GameMngmt: FC<Props> = (props) => {
    // react hook
    const [games, setGames] = React.useState({name: '', year: 0, imgPath: '', description: '', id: null});
    // dexie hook to get data
    const gamesArray = useLiveQuery(() => db.games.toArray());

    //add game
    const addGame = React.useCallback(async () => {
        if (games?.name && games?.imgPath){
            await db.games.add({
                name:games?.name,
                year:games?.year,
                imgPath: games?.imgPath,
                description: games?.description
            });
            setGames({name: '', year: 0, imgPath: '', description: '', id: null})
        }
    }, [games]);

    //update game
    const updateGame = React.useCallback(async () => {
        if (games?.name && games?.imgPath){
            await db.games.put({
                id: Number(games?.id),
                name:games?.name,
                year:games?.year,
                imgPath: games?.imgPath,
                description: games?.description
            });
            setGames({name: '', year: 0, imgPath: '', description: '', id: null});
        }
    }, [games])

    //delete game
    const deleteGame = React.useCallback(async (id:any) => {
        await db.games.delete(id);
    }, [])

    const TableHeadAdmin = () => { 
        return (
            <thead>
    
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>IMG</th>
                    <th>DESC</th>
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
                    gamesArray?.map((i: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td><Image loader={imageLoader} src={i.imgPath} width={500} height={500} alt={i.name} /></td>
                                <td>{i.description}</td>
                                <td><button onClick={() => setGames({...i})}>UPDATE</button></td>
                                <td><button onClick={addGame} onClickCapture={() => deleteGame(i.id)}>DELETE</button></td>
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
                    <th>NAME</th>
                    <th>IMG</th>
                    <th>DESC</th>
                </tr>
            </thead>
        );
    }
    const TableBodyReg = () => {
        return (
            <tbody>
                {
                    gamesArray?.map((i: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{i.name}</td>
                                <td><Image loader={imageLoader} src={i.imgPath} width={500} height={500} alt={i.name} /></td>
                                <td>{i.description}</td>
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

    const GameList = () => {
        return (
            <div className="game-list">
                <table>
                    {tablehead}
                    {tablebody}
                </table>
            </div>
        )
    }

    if (props.isAdmin == true) {
        return (
            <>
                <div>
                    <div>
                        <h2>{games?.id ? 'Update' : 'Add'} Ability</h2>
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input type="text" value={games?.name} onChange={(e) => setGames({...games, name: e.target.value})} placeholder="Name" name="Name" required />
                            <label htmlFor="Year">Year</label>
                            <input type="number" min="0" max="9999" value={games?.year} onChange={(e) => setGames({...games, year: e.target.valueAsNumber})} placeholder="Year" name="Year" required />
                            <label htmlFor="imgPath"></label>
                            <input type="text" value={games?.imgPath} onChange={(e) => setGames({...games, imgPath: e.target.value})} placeholder="Image Path" name="imgPath" required />
                            <label htmlFor="description"></label>
                            <input type="text" value={games?.description} onChange={(e) => setGames({...games, description: e.target.value})} placeholder="Description" name="description" required />
                            {
                                games?.id ? (
                                    <button onClick={updateGame}>SUBMIT</button>
                                ) : (
                                    <button onClick={addGame}>ADD</button>
                                )
                            }
                        </div>

                    <div>
                        <GameList />
                    </div>
                    </div>
                </div>
            </>
        );
    } 
    else {
        return (
            <div>
                <GameList />
            </div>
        )
    }

}

export default GameMngmt;

