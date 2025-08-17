"use client"
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import TTSVoiceSelect from "@/components/TTSVoiceSelect";
import {Slider} from "@/components/ui/slider";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setRandomVoice, setSpeed} from "@/store/TTSSlice";
import {setListenChips, setPlayCount} from "@/store/ListenChipSlice";
import {Input} from "@/components/ui/input";
import {useTTS} from "@/hooks/useTTS";
import {Switch} from "@/components/ui/switch";

const ListenerInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const {speed, random} = useAppSelector(state => state.tts);
    const {playText, loopText} = useTTS()
    const {playCount, chips} = useAppSelector(state => state.listener)
    const [value, setValue] = React.useState("");

    const placeholder = `Please paste the text`;

    const handleSliderChange = (value: number[]) => {
        dispatch(setSpeed(value[0]));
    };

    function handleGenerate() {
        // 按照英文句号进行切割
        const textList = value.split(/\.+/).filter(item => item !== "").map(item => item.trim()+ ". ");
        dispatch(setListenChips(textList))
        setValue("")
    }

    function handleCountChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setPlayCount(parseInt(e.target.value)))
    }

    function handleReadAll() {
        const result = chips.join("")
        playText(result)
    }

    function handleReadRAll() {
        const result = chips.map(item =>
            `${item}`.repeat(playCount)
        ).join("")
        playText(result)
    }

    function handleLoopAll() {
        const result = chips.map(item =>
            `${item}`.repeat(playCount)
        ).join("")
        loopText(result)
    }

    function handleRandomChange() {
        dispatch(setRandomVoice(!random))
    }

    return (
        <div className={"my-8"}>
            <Textarea
                placeholder={placeholder}
                value={value}
                className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg p-3 h-[8rem] overflow-y-auto focus:border-blue-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
                onChange={(e) => setValue(e.target.value)}
            />
            <div className={"flex gap-2 mt-4 items-center"}>
                <Button onClick={handleGenerate} disabled={value === ""}>Generate</Button>
                <Button onClick={handleReadAll} disabled={chips.length === 0}>Play All</Button>
                <Button onClick={handleReadRAll} disabled={chips.length === 0}>PlayR All</Button>
                <Button onClick={handleLoopAll} disabled={chips.length === 0}>Loop All</Button>
                <Input type={"number"} placeholder={"playCount"} className={"w-[60px] text-white"} value={playCount}
                       onChange={handleCountChange}/>
                <Switch checked={random} onCheckedChange={handleRandomChange}/>
                <p className="text-sm text-gray-600">
                    Random
                </p>
            </div>
            <div className={"mt-4"}>
                <TTSVoiceSelect/>
            </div>
            <div className={"mt-4 flex gap-4"}>
                <label className={"text-sm w-[140px] text-gray-100"}>TTS Speed({speed})</label>
                <Slider
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={[speed]}
                    onValueChange={handleSliderChange}
                    className="slider-custom"
                />
            </div>
        </div>
    );
};

export default ListenerInput;