import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useTTS} from "@/hooks/useTTS";
import {useAudioRecorder} from "@/hooks/useAudioRecorder";
import {set} from "lodash";

type ListItemProps = {
    index: string
    lang1: string;
    lang2: string;
}

type PlayState = "playing" | "looping" | "paused" | "stopped";

const ListItem: React.FC<ListItemProps> = ({index, lang1, lang2}) => {

    const [isLang1Visible, setIsLang1Visible] = useState(false);
    const [showWordCount, setShowWordCount] = useState(0)
    const [hint, setHint] = useState("")
    const {playText, loopText, stopPlay} = useTTS()
    const { isRecording, startRecording, stopRecording, playRecording, isPlaying } = useAudioRecorder()
    const [playState, setPlayState] = useState<PlayState>("stopped")

    useEffect(() => {
        const list = lang1.split(" ")
        const tail = showWordCount === list.length ? " (Done)" : ""
        setHint(lang1.split(" ").slice(0, showWordCount).join(" ") + tail)
    }, [showWordCount]);

    const toggleLang1Visibility = () => {
        setIsLang1Visible(!isLang1Visible);
    };


    function handleNextWord() {
        if (showWordCount < lang1.split(" ").length) {
            setShowWordCount(showWordCount + 1)
        } else {
            setShowWordCount(0)
        }
    }

    function handlePlay() {
        setPlayState("playing")
        playText(lang1, () => {
            setPlayState("stopped")
        })
    }

    function handleLoop() {
        setPlayState("looping")
        loopText(lang1, () => {
            setPlayState("stopped")
        })
    }

    function handleStop() {
        stopPlay()
        setPlayState("stopped")
    }

    function handleRecord() {
        if(isRecording){
            stopRecording()
        } else {
            startRecording()
        }
    }

    function handlePlayback() {
        playRecording()
    }

    function handleCurrentWord() {
        playText(lang1.split(" ")[showWordCount-1])
    }

    function handleReset() {
        setShowWordCount(0)
    }

    return (
        <div className="p-4 mt-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg shadow-gray-800/50 text-white">
            <div className={"flex"}>
                <div className={"text-2xl font-bold text-yellow-200"}>{index}</div>
                <Button
                    className="ml-auto"
                    size="sm"
                    onClick={toggleLang1Visibility}
                    aria-expanded={isLang1Visible}
                >
                    {isLang1Visible ? "Hide EN" : "Show EN"}
                </Button>
                <Button className={"ml-2"} size={"sm"} onClick={handleReset} disabled={showWordCount === 0}>Reset Hint</Button>
            </div>
            <div className={"mt-8 text-gray-100 text-lg"} style={{display: isLang1Visible ? "block" : "none"}}>
                {lang1}
            </div>
            <div className={"mt-8 mb-8 border-l-4 border-gray-400 pl-4 italic text-gray-400"}>
                {lang2}
            </div>
            <div className={"mt-8 mb-8 border-l-4 border-gray-400 pl-4 italic text-gray-400"}>
                {hint}
            </div>

            <div className={"flex gap-2 mt-2"}>
                <Button className={"flex-1"} size={"sm"}
                        onClick={handlePlay}>{playState === "playing" ? "Playing..." : "Play"}</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleLoop}>
                    {playState === "looping" ? "Looping..." : "Loop"}
                </Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleStop} disabled={playState === "stopped"}>Stop</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleNextWord}>Next Word</Button>
                <Button className={"flex-1"} size={"sm"} onClick={handleCurrentWord} disabled={showWordCount === 0}>Play Word</Button>
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