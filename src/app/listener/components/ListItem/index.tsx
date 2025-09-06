import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {useTTS} from "@/hooks/useTTS";
import {useAudioRecorder} from "@/hooks/useAudioRecorder";
import {useAppSelector} from "@/store/hooks";

type ListItemProps = {
    index: string
    text: string;
}


const ListItem: React.FC<ListItemProps> = ({index, text}) => {
    const {playText, loopText, stopPlay, playState} = useTTS()
    const {isRecording, startRecording, stopRecording, playRecording, isPlaying} = useAudioRecorder()
    const {playCount, chips} = useAppSelector(state => state.listener)

    function handlePlay() {
        playText(text)
    }

    function handleRepeatPlay() {
        playText(`${text}`.repeat(playCount))
    }

    function handleLoop() {
        loopText(text)
    }

    function handleStop() {
        stopPlay()
    }

    function handleRecord() {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    function handlePlayback() {
        playRecording()
    }

    function handleContinuedPlay() {
        const result = chips.slice(Number(index[0]) - 1, chips.length).join("")
        playText(result)
    }

    function handleRepeatedContinuedPlay() {
        const result = chips.slice(Number(index[0]) - 1, chips.length).map(item =>
            `${item}`.repeat(playCount)
        ).join("")
        playText(result)
    }

    function handlePlaySelection() {
        playText(window.getSelection()?.toString() || "")
    }

    function handleLoopSelection() {
        loopText(window.getSelection()?.toString() || "")
    }

    function handlePlayRepeatedSelection() {
        playText(`${window.getSelection()?.toString()}. `.repeat(playCount))
    }

    function handleLoopWithIndian() {
        loopText(text, null, true)
    }

    function handlePlayCWithIndian(){
        const result = chips.slice(Number(index[0]) - 1, chips.length).join("")
        playText(result, null, true)
    }

    return (
        <div className="p-4 mt-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg shadow-gray-800/50 text-white">
            <div className={"flex"}>
                <div className={"text-2xl font-bold text-yellow-200"}>{index}</div>
                <Button className={"ml-auto w-20"} size={"sm"} onClick={handleLoopWithIndian} disabled={isPlaying}>
                    LoopInd
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handlePlayCWithIndian} disabled={isPlaying}>
                    IndC
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handlePlaySelection} disabled={isPlaying}>
                    PlayS
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handlePlayRepeatedSelection} disabled={isPlaying}>
                    PlayRS
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handleLoopSelection} disabled={isPlaying}>
                    PlayL
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handleRecord} disabled={isPlaying}>
                    {isRecording ? "Finish" : "Record"}
                </Button>
                <Button className={"ml-2 w-20"} size={"sm"} onClick={handlePlayback}>
                    {isPlaying ? "Stop" : "Playback"}
                </Button>
            </div>
            <div className={"mt-4 text-gray-100 text-lg"} style={{visibility: isRecording ?"hidden": "visible"}}>
                {text}
            </div>

            <div className={"flex gap-2 mt-4"}>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handlePlay}>{playState === "playing" ? "Playing..." : "Play"}</Button>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handleRepeatPlay}>PlayR</Button>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handleContinuedPlay}>PlayC</Button>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handleRepeatedContinuedPlay}>PlayRC</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleLoop}>
                    {playState === "looping" ? "Looping..." : "Loop"}
                </Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleStop}
                        disabled={playState === "stopped"}>Stop</Button>

            </div>
        </div>)
}

export default ListItem