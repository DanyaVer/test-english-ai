import { useCallback, useEffect, useState } from 'react';
import { generateTextOptions, CREATE_TEXT_PROMPT_ENDPOINT } from '../constants/MakeText.consts';

/* Usage of up to date methods (Functional components, React hooks) */

export const useTextGenerator = (wordsSequence) => {
    const [text, setText] = useState([]); // Set the text state
    const [textIsLoading, setTextIsLoading] = useState(false);

    // async-await function to handle asynchronous
    const generateText = useCallback(async () => {
        try {
            setTextIsLoading(true);
            const options = generateTextOptions(wordsSequence);
            const response = await fetch(CREATE_TEXT_PROMPT_ENDPOINT, options);
            const parsedResponse = await response.json();
            const text = parsedResponse.completions[0].data.text;
            let list = text.split("\n\n");
            // if the last symbols are '\n' or ' '
            while (list[list.length - 1].length < 10)
                list.pop();
            console.log(list);
            setText(list);
            // Devtool help
            console.log('Generated text:', text);
        } catch (error) {
            console.error(error);
        } finally {
            setTextIsLoading(false);
        }
    }, [setTextIsLoading, setText, wordsSequence]);

    return {
        text,
        generateText,
        textIsLoading
    }
}