import { useCallback, useState } from "react";
import { generateTextOptions, CREATE_TEXT_PROMPT_ENDPOINT } from "../constants/MakeText.consts";

/* Usage of up to date methods (Functional components, React hooks) */

export const useTextGenerator = (wordsSequence) => {
  const [text, setText] = useState([]); // Set the text state
  const [textIsLoading, setTextIsLoading] = useState(false);

  // async-await function to handle asynchronous
  const generateText = useCallback(async () => {
    try {
        setTextIsLoading(true);
        const options = generateTextOptions(wordsSequence);
        // for correcting results.
        do {
            var flag = false;
            const response = await fetch(CREATE_TEXT_PROMPT_ENDPOINT, options);
            const parsedResponse = await response.json();
            var text = parsedResponse.completions[0].data.text;
            var list = text.split("\n\n");
            // to hide a warning
            // eslint-disable-next-line no-loop-func
            list.forEach((el) => {
                if (el.split(" ").length < 5) {
                    // devTool (too big)
                    // console.log("Paragraph is less than 4 words");
                    flag = true;
                }
            });
            if (list.length > 7 || list.length < 3) {
                // devTool (too big)
                // console.log("Paragraphs' amount is less than more than 6 or less then 3");
                flag = true;
            }
        } while (flag);
        // if the last symbols are '\n' or ' '
        // while (list[list.length - 1].length < 10) list.pop();
        setText(list);
        // Devtool help
        console.log("Generated text: ", text);
    } catch (error) {
      console.error(error);
    } finally {
      setTextIsLoading(false);
    }
  }, [setTextIsLoading, setText, wordsSequence]);

  return {
    text,
    generateText,
    textIsLoading,
  };
};
