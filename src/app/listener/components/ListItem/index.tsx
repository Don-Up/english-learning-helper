import React from "react";
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
    const {playCount} = useAppSelector(state => state.listener)

    function handlePlay() {
        playText(text)
    }

    function handleRepeatPlay() {
        playText(`${text}. `.repeat(playCount))
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

    return (
        <div className="p-4 mt-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg shadow-gray-800/50 text-white">
            <div className={"flex"}>
                <div className={"text-2xl font-bold text-yellow-200"}>{index}</div>

            </div>
            <div className={"mt-8 text-gray-100 text-lg"}>
                {text}
            </div>

            <div className={"flex gap-2 mt-4"}>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handlePlay}>{playState === "playing" ? "Playing..." : "Play"}</Button>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handleRepeatPlay}>{playState === "playing" ? "Playing..." : "PlayR"}</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleLoop}>
                    {playState === "looping" ? "Looping..." : "Loop"}
                </Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleStop}
                        disabled={playState === "stopped"}>Stop</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleRecord} disabled={isPlaying}>
                    {isRecording ? "Finish" : "Record"}
                </Button>
                <Button className={"flex-1"} size={"sm"} onClick={handlePlayback}>
                    {isPlaying ? "Stop" : "Playback"}
                </Button>
            </div>
        </div>)
}

export default ListItem