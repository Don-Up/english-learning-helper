"use client"
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import TTSVoiceSelect from "@/components/TTSVoiceSelect";
import {Slider} from "@/components/ui/slider";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setSpeed} from "@/store/TTSSlice";
import {LangPair, setLangList} from "@/store/LangSlice";

const ContentInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const {speed} = useAppSelector(state => state.tts);
    const [value, setValue] = React.useState("");

    const placeholder = `Please paste the text (example format): \n\nHi! I’m interested...\n你好！我想...\nSure! We offer...\n当然可以...\nI’m looking to...\n我想提高...`;

    const handleSliderChange = (value: number[]) => {
        dispatch(setSpeed(value[0]));
    };

    function handleGenerate() {
        const textList = value.split("\n").filter(item => item !== "");
        const langPairs: LangPair[] = []
        for (let i = 0; i < textList.length; i += 2) {
            langPairs.push({
                lang1Text: textList[i],
                lang2Text: textList[i + 1]
            })
        }
        dispatch(setLangList(langPairs))
        setValue("")
    }

    return (
        <div className={"my-8"}>
            <Textarea
                placeholder={placeholder}
                value={value}
                className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg p-3 h-[12rem] overflow-y-auto focus:border-blue-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
                onChange={(e) => setValue(e.target.value)}
            />
            <div className={"flex gap-2 mt-4"}>
                <Button onClick={handleGenerate} disabled={value === ""}>Generate</Button>
                {/*<Button disabled={value === ""}>Reset</Button>*/}
                {/*<Button>Immersive Mode</Button>*/}
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

export default ContentInput;