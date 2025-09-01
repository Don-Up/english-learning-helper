'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTTS } from '@/hooks/useTTS'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setWords, appendWords, toggleMask, moveToEnd, removeFirst } from '@/store/WordSlice'
import TTSVoiceSelect from "@/components/TTSVoiceSelect"

export default function WordsPage() {
    const [input, setInput] = useState('')
    const { words, isMasked } = useAppSelector(state => state.word)
    const dispatch = useAppDispatch()
    const { playText, isReady } = useTTS()
    const [play, setPlay] = useState(false)

    const currentWord = words[0]
    const remaining = words.length

    useEffect(() => {
        if(play && words.length > 0){
            playText(currentWord)
            setPlay(false)
        }
    }, [play]);


    useEffect(() => {
        if (words.length > 0 && isReady && isMasked) {
            playText(currentWord)
        }
    }, [currentWord, isReady, words])

    const handleGenerate = () => {
        const newWords = input.split(',').map(w => w.trim()).filter(w => w)
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = newWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newWords[i], newWords[j]] = [newWords[j], newWords[i]];
        }
        dispatch(setWords(newWords))
        setInput('')
        setPlay(true)
    }

    const handleAppend = () => {
        const newWords = input.split(',').map(w => w.trim()).filter(w => w)
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = newWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newWords[i], newWords[j]] = [newWords[j], newWords[i]];
        }
        dispatch(appendWords(newWords))
        setInput('')
    }

    const handlePlay = () => {
        if (currentWord && isReady) {
            playText(currentWord)
        }
    }

    const handleView = () => {
        dispatch(toggleMask(false))
    }

    const handleLater = () => {
        if (words.length === 0) return
        dispatch(moveToEnd())
    }

    const handleNoProblem = () => {
        if (words.length === 0) return
        dispatch(removeFirst())
    }

    return (
        <div className="flex justify-center bg-gray-900 h-screen max-h-screen">
            <div className="pt-20 lg:w-1/2 w-3/4">
                <Card className="bg-gray-800 text-white border border-gray-600 rounded-lg shadow-lg shadow-gray-800/50">
                    <CardHeader>
                        <CardTitle className="text-2xl">Word Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TTSVoiceSelect />
                        <Textarea
                            placeholder="Enter words or phrases separated by commas"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="mb-4 h-[8rem] mt-4"
                        />
                        <div className="flex space-x-4 mb-4">
                            <Button onClick={handleGenerate}>Generate</Button>
                            <Button onClick={handleAppend}>Append</Button>
                        </div>

                        {words.length > 0 && (
                            <div className="mt-12">
                                <div className="relative flex justify-center items-center mb-4">
                                    <p className="text-6xl font-bold">{currentWord}</p>
                                    {isMasked && (
                                        <div className="absolute inset-0 bg-gray-600 opacity-100 flex justify-center items-center" />
                                    )}
                                </div>
                                <div className="flex justify-center space-x-4 mb-4 mt-16">
                                    <Button onClick={handlePlay}>Play</Button>
                                    <Button onClick={handleView}>View</Button>
                                    <Button onClick={handleLater}>Later Review</Button>
                                    <Button onClick={handleNoProblem}>No Problem</Button>
                                </div>
                                <p className="text-center">Remaining words: {remaining}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}