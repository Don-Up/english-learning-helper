"use client"
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import TTSVoiceSelect from "@/components/TTSVoiceSelect";
import {Slider} from "@/components/ui/slider";

const ContentInput: React.FC = () => {

    const [value, setValue] = useState("")
    const [speed, setSpeed] = useState(1)
    
    const placeholder = `Please paste the text (example format): \n\nHi! I’m interested...\n你好！我想...\nSure! We offer...\n当然可以...\nI’m looking to...\n我想提高...`

    function handleSliderChange() {

    }

    return (<div className={"my-8"}>
        <Textarea
            placeholder={placeholder}
            value={value}
            className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg p-3 min-h-[8rem] resize-y focus:border-blue-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
            onChange={(e) => setValue(e.target.value)}
        />
        <div className={"flex gap-2 mt-4"}>
            <Button>Generate</Button>
            <Button>Reset</Button>
            <Button>Immersive Mode</Button>
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
                onValueChange={(value) => setSpeed(value[0])}
                className="slider-custom"
            />
        </div>
    </div>)
}

export default ContentInput