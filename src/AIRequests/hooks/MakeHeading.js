import { useCallback, useState } from "react";
import { generateHeadingOptions, CREATE_HEADING_PROMPT_ENDPOINT } from "../constants/MakeHeading.consts";

/* Usage of up to date methods (Functional components, React hooks) */

export const useHeadingGenerator = (text) => {
const [headings, setHeadings] = useState([]); // Set the text state
const [headingAreLoading, setHeadingAreLoading] = useState(false);

// async-await function to handle asynchronous
const generateHeading = useCallback(async () => {
    let arr = [];
    try {
    setHeadings([]);
    setHeadingAreLoading(true);
    text.forEach(async (paragraph, index) => {
        // DevTool help (too big)
        // console.log(`Generating heading for ${index} paragraph: ` + paragraph);
        const options = generateHeadingOptions(paragraph);
        // for correcting results.        
        do {
            var flag = false;
            const response = await fetch(CREATE_HEADING_PROMPT_ENDPOINT, options);
            const parsedResponse = await response.json();
            var res = parsedResponse.completions[0].data.text;
            // like one word
            if (res.split(' ').length < 3 || res.split(' ').length > 16 || res.split('\n').length > 3) {
                // devTool help (too big)
                // console.log("Repeat generating heading for paragraph " + index);
                // console.log("Wrong heading: " + res);
                flag = true;
            }
        } while (flag);
        arr.push([res, index]);
        // Devtool help (too big)
        // console.log("Generated heading: ", res);
    });
    } catch (error) {
        console.error(error);
    } finally {
        setHeadingAreLoading(false);
        // shuffling headings
        arr.sort((a, b) => 0.5 - Math.random());
        setHeadings(arr);
        // devTool help
        console.log("HEADINGS ARE GENERATED");
    }
}, [setHeadingAreLoading, setHeadings, text]);

return {
    headings,
    generateHeading,
    headingAreLoading,
};
};
