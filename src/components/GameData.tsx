'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import Image from "next/image";

//TODO - Pull record from game database using ID as input, display all info and abilities present in those games

type Props = { 
    gameId: number
}

// load images 
const gameImgLoader = (props: any) => {
    return `/game-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}

// load images 
const abilityImgLoader = (props: any) => {
    return `/ability-art/${props.src}?w=${props.width}?q=${props.quality || 75}`
}

const GameData: FC<Props> = (props) => {
    // retrieve data for current game
    const currGameData = useLiveQuery(() => db.games.where("id").equals(props.gameId).first())
    // retrieve data for abilities that exist in current game
    const gameAbilityList = useLiveQuery(() => db.gameAbilities.where("gameNo").equals(props.gameId).toArray())
    // retrieve data for all abilities in the kirby franchise
    const fullAbilityList = useLiveQuery(() => db.abilities.toArray())
    return (
        <div>
            <div>GameID: {props.gameId}</div>
            <div>{currGameData?.name}</div>
            <div><Image loader={gameImgLoader} src={currGameData?.imgPath ?? "null"} width={500} height={500} alt={currGameData?.name ?? "null"} /></div>
            <div>{currGameData?.description}</div>
            <div>
                <h3>Abilities in game:</h3>
                {
                    gameAbilityList?.map((i: any, index: number) => {
                        let currAbility = fullAbilityList?.find(j => j.id === i.abilityNo)
                        return (
                            <div key={index}>
                                <div>{currAbility?.name}</div>
                                <div><Image loader={abilityImgLoader} src={currAbility?.imgPath ?? "null"} width={250} height={250} alt={currAbility?.name ?? "null"} /></div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

export default GameData;