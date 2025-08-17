import React from "react";
import ListItem from "@/app/listener/components/ListItem";
import {useAppSelector} from "@/store/hooks";

const ListenerList: React.FC = () => {

    const {chips} = useAppSelector(state => state.listener)

    return (< div
        className={"pb-8"}>
        {
            chips.map((item, index) => {
                return <ListItem key={index} index={`${index + 1}/${chips.length}`} text={item}/>
            })
        }
    </div>)
}

export default ListenerList