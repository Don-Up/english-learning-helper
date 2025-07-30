import React from "react";
import {Button} from "@/components/ui/button";

type ListItemProps = {
    index: string
    lang1: string;
    lang2: string;
}

const ListItem: React.FC<ListItemProps> = ({index, lang1, lang2}) => {

    return (<div className="p-4 mt-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg shadow-gray-800/50 text-white">
        <div className={"flex"}>
            <div className={"text-3xl text-gray-100"}>{index}</div>
            <Button className={"ml-auto"} size={"sm"}>Show/Hide</Button>
            <Button className={"ml-2"} size={"sm"}>Reset</Button>
        </div>
        <div className={"mt-8 text-gray-100"}>
            {lang1}
        </div>
        <div className={"mt-4 mb-8 border-l-4 border-gray-400 pl-4 italic text-gray-400"}>
            {lang2}
        </div>

        <div className={"flex gap-2 mt-2"}>
            <Button className={"flex-1"} size={"sm"}>Play</Button>
            <Button className={"flex-1"} size={"sm"}>Loop</Button>
            <Button className={"flex-1"} size={"sm"}>Stop</Button>
            <Button className={"flex-1"} size={"sm"}>Next Word</Button>
            <Button className={"flex-1"} size={"sm"}>Record</Button>
            <Button className={"flex-1"} size={"sm"}>Playback</Button>
        </div>
    </div>)
}

export default ListItem