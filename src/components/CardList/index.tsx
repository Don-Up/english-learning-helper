"use client"
import React from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import ListItem from "@/components/ListItem";

const CardList: React.FC = () => {

    const dispatch = useAppDispatch()
    const {list} = useAppSelector(state => state.lang)

    return (<div className={"pb-8"}>
        {
            list.map((item, index) => {
                return <ListItem key={index} index={`${index+1}/${list.length}`} lang1={item.lang1Text} lang2={item.lang2Text}/>
            })
        }
    </div>)
}

export default CardList