import { useCallback, useState } from 'react';
import { generateHeadingOptions, CREATE_HEADING_PROMPT_ENDPOINT } from '../constants/MakeHeading.consts';

/* Usage of up to date methods (Functional components, React hooks) */

export const useHeadingGenerator = (text) => {
    const [headings, setHeadings] = useState([]); // Set the text state
    const [headingIsLoading, setHeadingIsLoading] = useState(false);

    // async-await function to handle asynchronous
    const generateHeading = useCallback(async () => {
        let arr = [];
        try {
            setHeadings([]);
            setHeadingIsLoading(true);
            text.forEach(async (paragraph, index) => {
                // DevTool help (too big)
                // console.log(`Generating heading for ${index} paragraph: ` + paragraph);
                const options = generateHeadingOptions(paragraph);
                const response = await fetch(CREATE_HEADING_PROMPT_ENDPOINT, options);
                await response.json().then((parsedResponse) => {
                    const res = parsedResponse.completions[0].data.text;
                    arr.push([res, index])
                    // Devtool help
                    console.log('Generated heading: ', res);
                }).catch(e => console.error(e));
                // let list = res.split('\n');
                // setHeadings(list);
                // console.log(list); 
            });
        } catch (error) {
            console.error(error);
        } finally {
            setHeadingIsLoading(false);
            // shuffling headings
            arr.sort((a, b) => 0.5 - Math.random());
            setHeadings(arr);
            console.log("------------------------");
            console.log(headings);
            console.log("------------------------");
            // devTool
            console.log("HEADINGS ARE GENERATED");
        }
    }, [setHeadingIsLoading, setHeadings, text]);

    return {
        headings,
        generateHeading,
        headingIsLoading
    }
}