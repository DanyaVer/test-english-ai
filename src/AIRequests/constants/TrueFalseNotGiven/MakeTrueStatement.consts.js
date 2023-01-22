import { promptTrueExample } from '../../../prompts/Statements/True';
import { API_KEY } from '../apiKey.const'

export const CREATE_TRUE_PROMPT_ENDPOINT = "https://api.ai21.com/studio/v1/j1-grande/complete";

const promptStart = "Generate true statement based on the paragraph:\n";
const promptEnd = "True statement:"

export const generateTrueOptions = (paragraph) => {
    let prompt = promptTrueExample + promptStart + paragraph + promptEnd;
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
            "temperature": 0.8,
            "topKReturn": 0,
            "topP":1,
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
              "scale": 1.55,
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