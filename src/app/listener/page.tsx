"use client"
import React from "react";
import BackToTopContainer from "@/components/BackToTopContainer";
import ListenerList from "@/app/listener/components/ListenChipList";
import ListenerInput from "@/app/listener/components/ListenerInput";

export default function ListenerPage() {

    return (
            <BackToTopContainer
                imageSrc="/backtotop.svg"
                className="flex justify-center bg-gray-900 h-screen max-h-screen overflow-auto custom-scrollbar">
                <div className="p-4 lg:w-1/2 w-4/5">
                    <div className="text-5xl mt-4 text-gray-100 font-bold">English Listener</div>
                    <ListenerInput />
                    <ListenerList />
                </div>
            </BackToTopContainer>
        )

}