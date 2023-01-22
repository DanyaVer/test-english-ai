// an example (prompt) text via IELTS Academic exam practice
import { text3 } from '../../prompts/Texts/3.js';
import { text2 } from '../../prompts/Texts/2.js';
import { text1 } from '../../prompts/Texts/1.js';
import { wordsSequence3 } from '../../prompts/WordsSequences/3.js';
import { API_KEY } from './apiKey.const'

// self explanatory names
const SEPARATOR = "\n##\n";
const promptEnd = "\nText:\n";
// if there is no word or a sequence of words
const prompt1Start = "Generate an academic text: ";
const prompt1Example1 = `${prompt1Start}${promptEnd}${text1}`;
const prompt1Example2 = `${prompt1Start}${promptEnd}${text2}`;
// if there are word or a sequence of words
const prompt2Start = "Generate an academic text using words and phrases: ";
const prompt2Example = `${prompt2Start}${wordsSequence3}${promptEnd}${text3}`;

export const CREATE_TEXT_PROMPT_ENDPOINT = "https://api.ai21.com/studio/v1/j1-grande/complete";
// actual prompt will be made later
var prompt;

export const generateTextOptions = (wordsSequence) => {
    if (wordsSequence.trim().length === 0)
        prompt = prompt1Example1 + SEPARATOR +
                 prompt1Example2 + SEPARATOR +        
                 prompt1Start + promptEnd;
    else 
        prompt = prompt2Example + SEPARATOR + 
                 prompt2Start + wordsSequence + promptEnd;
    
    // for esier work with DevTool
    console.log("prompt:" + prompt);
    return {
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "numResults": 1,
            "maxTokens": 1000,
            "temperature": 0.8,
            "topKReturn": 0,
            "topP": 1,
            "countPenalty": {
                "scale": 0.24,
                "applyToNumbers": false,
                "applyToPunctuations": false,
                "applyToStopwords": false,
                "applyToWhitespaces": false,
                "applyToEmojis": false
            },
            "frequencyPenalty": {
                "scale": 23,
                "applyToNumbers": false,
                "applyToPunctuations": false,
                "applyToStopwords": false,
                "applyToWhitespaces": false,
                "applyToEmojis": false
            },
            "presencePenalty": {
                "scale": 1,
                "applyToNumbers": false,
                "applyToPunctuations": false,
                "applyToStopwords": false,
                "applyToWhitespaces": false,
                "applyToEmojis": false
            },
            "stopSequences": ["##"]
        }),
        method: "POST"
    }
}