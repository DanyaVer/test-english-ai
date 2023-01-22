import { promptExamples } from '../../prompts/Headings';
import { API_KEY } from './apiKey.const'

export const CREATE_HEADING_PROMPT_ENDPOINT = "https://api.ai21.com/studio/v1/j1-grande/complete";

// const promptStart = "Generate headings for each paragraph in the text:\n";
// const promptEnd = "\nHeadings:"
const promptStart = "Generate a heading based on the paragraph:\n";
const promptEnd = "Heading:"

export const generateHeadingOptions = (paragraph) => {
    let prompt = promptExamples + promptStart + paragraph + promptEnd;
    // for esier work with DevTool (takes too much space)
    // console.log("prompt:" + prompt);
    return {
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "numResults": 1,
            "maxTokens": 20,
            "temperature": 0.9,
            "topKReturn": 0,
            "topP": 1,
            "countPenalty": {
              "scale": 1.2,
              "applyToNumbers": false,
              "applyToPunctuations": false,
              "applyToStopwords": false,
              "applyToWhitespaces": false,
              "applyToEmojis": false
            },
            "frequencyPenalty": {
              "scale": 0.55,
              "applyToNumbers": false,
              "applyToPunctuations": false,
              "applyToStopwords": false,
              "applyToWhitespaces": false,
              "applyToEmojis": false
            },
            "presencePenalty": {
              "scale": 0,
              "applyToNumbers": false,
              "applyToPunctuations": false,
              "applyToStopwords": false,
              "applyToWhitespaces": false,
              "applyToEmojis": false
            },
            "stopSequences":["##"]
          }),
        method: "POST"
    }
}