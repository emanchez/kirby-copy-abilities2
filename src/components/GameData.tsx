'use client'
import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks"; 
import Image from "next/image";

//TODO - Pull record from game database using ID as input, display all info and abilities present in those games

type Props = { 
    gameId: number
}

const GameData: FC<Props> = (props) => {
    return (
        <div>GameData</div>
    )
}

export default GameData;