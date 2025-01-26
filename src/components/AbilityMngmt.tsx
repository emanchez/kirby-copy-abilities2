'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import { add } from "dexie";
import Image from "next/image";


const imageLoader = (props: any) => {
    return `/ability-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}

type Props = { isAdmin: boolean }

const AbilityMngmt: FC<Props> = (props) => {
    // react hook
    const [abilities, setAblilities] = React.useState({name: '', imgPath: '', description: '', id: null});
    // dexie hook to get data
    const abilityList = useLiveQuery(() => db.abilities.toArray());

    //add ability
    const addAbility = React.useCallback(async () => {
        if (abilities?.name && abilities?.imgPath){
            await db.abilities.add({
                name:abilities?.name,
                imgPath: abilities?.imgPath,
                description: abilities?.description
            });
            setAblilities({name: '', imgPath: '', description: '', id: null})
        }
    }, [abilities]);

    //update ability
    const updateAbility = React.useCallback(async () => {
        if (abilities?.name && abilities?.imgPath){
            await db.abilities.put({
                id: Number(abilities?.id),
                name: abilities?.name,
                imgPath: abilities?.imgPath,
                description: abilities?.description
            });
            setAblilities({name: '', imgPath: '', description: '', id: null});
        }
    }, [abilities])

    //delete ability
    const deleteAbility = React.useCallback(async (id:any) => {
        await db.abilities.delete(id);
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
                    abilityList?.map((i: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td><Image loader={imageLoader} src={i.imgPath} width={500} height={500} alt={i.name} /></td>
                                <td>{i.description}</td>
                                <td><button onClick={() => setAblilities({...i})}>UPDATE</button></td>
                                <td><button onClick={addAbility} onClickCapture={() => deleteAbility(i.id)}>DELETE</button></td>
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
                    abilityList?.map((i: any, index: number) => {
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

    const AbilityList = () => {
        return (
            <div className="ability-list">
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
                        <h2>{abilities?.id ? 'Update' : 'Add'} Ability</h2>
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input type="text" value={abilities?.name} onChange={(e) => setAblilities({...abilities, name: e.target.value})} placeholder="Name" name="Name" />
                            <label htmlFor="imgPath"></label>
                            <input type="text" value={abilities?.imgPath} onChange={(e) => setAblilities({...abilities, imgPath: e.target.value})} placeholder="Image Path" name="imgPath" />
                            <label htmlFor="description"></label>
                            <input type="text" value={abilities?.description} onChange={(e) => setAblilities({...abilities, description: e.target.value})} placeholder="Description" name="description" />
                            {
                                abilities?.id ? (
                                    <button onClick={updateAbility}>SUBMIT</button>
                                ) : (
                                    <button onClick={addAbility}>ADD</button>
                                )
                            }
                        </div>

                    <div>
                        <AbilityList />
                    </div>
                    </div>
                </div>
            </>
        );
    } 
    else {
        return (
            <div>
                <AbilityList />
            </div>
        )
    }

}

export default AbilityMngmt;

