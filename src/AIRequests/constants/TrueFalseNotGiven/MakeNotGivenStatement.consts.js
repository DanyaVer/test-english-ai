import { promptNotGivenExample } from '../../../prompts/Statements/NotGiven';
import { API_KEY } from '../apiKey.const'

export const CREATE_NOT_GIVEN_PROMPT_ENDPOINT = "https://api.ai21.com/studio/v1/j1-grande/complete";

const promptStart = "Generate 'not given' statement based on the paragraph:\n";
const promptEnd = "'Not given' statement:"

export const generateNotGivenOptions = (paragraph) => {
    let prompt = promptNotGivenExample + promptStart + paragraph + promptEnd;
    // for esier work with DevTool (takes too much space)
    // console.log(prompt);
    return {
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "numResults": 1,
            "maxTokens": 20,
            "temperature": 0.95,
            "topKReturn": 0,
            "topP": 1,
            "countPenalty": {
                "scale": 0.5,
                "applyToNumbers": false,
                "applyToPunctuations": false,
                "applyToStopwords": false,
                "applyToWhitespaces": false,
                "applyToEmojis": false
            },
            "frequencyPenalty": {
                "scale": 0,
                "applyToNumbers": false,
                "applyToPunctuations": false,
                "applyToStopwords": false,
                "applyToWhitespaces": false,
                "applyToEmojis": false
            },
            "presencePenalty": {
                "scale": 3.05,
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