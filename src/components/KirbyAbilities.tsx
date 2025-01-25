'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import Image from "next/image";


const imageLoader = (props: any) => {
    return `/ability-art/${props.src}?w=${props.width || 500}?q=${props.quality || 75}`
}

const KirbyAbilities: FC = () => {


    // dexie hook to get data
    const abilityList = useLiveQuery(() => db.abilities.toArray());


    const AbilityList = () => {
        return (
            <div className="ability-list">
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>IMG</th>
                            <th>DESC</th>
                        </tr>
                    </thead>
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
                </table>
            </div>
        )
    }

    return (
        <div>
            <AbilityList />
        </div>
    );
}

export default KirbyAbilities;