import { useCallback, useState } from 'react';
import { generateTrueOptions, CREATE_TRUE_PROMPT_ENDPOINT } from '../constants/TrueFalseNotGiven/MakeTrueStatement.consts';
import { generateFalseOptions, CREATE_FALSE_PROMPT_ENDPOINT } from '../constants/TrueFalseNotGiven/MakeFalseStatement.consts';
import { generateNotGivenOptions, CREATE_NOT_GIVEN_PROMPT_ENDPOINT } from '../constants/TrueFalseNotGiven/MakeNotGivenStatement.consts';

/* Usage of up to date methods (Functional components, React hooks) */

export const useStatementsGenerator = (text) => {
    const [statements, setStatements] = useState([]); // Set the text state
    const [statementsAreLoading, setStatementsAreLoading] = useState(false);

    // async-await function to handle asynchronous
    const generateStatements = useCallback(async () => {
        let arr = [];
        try {
            setStatements([]);
            setStatementsAreLoading(true);
            text.forEach(async (paragraph, index) => {
                console.log(index);
                // DevTool help (too big)
                // console.log(`Generating statement for ${index} paragraph: ` + paragraph);

                // 0 - false, 1 - true, 2 - not given
                let rand = Math.floor(Math.random() * 3);
                let options, response;
                let PROMPT_END_POINT;
                if (rand === 0) {
                    options = generateFalseOptions(paragraph);
                    PROMPT_END_POINT = CREATE_FALSE_PROMPT_ENDPOINT;
                }
                if (rand === 1) {
                    options = generateTrueOptions(paragraph);
                    PROMPT_END_POINT = CREATE_TRUE_PROMPT_ENDPOINT;
                }
                if (rand === 2) {
                    options = generateNotGivenOptions(paragraph);
                    PROMPT_END_POINT = CREATE_NOT_GIVEN_PROMPT_ENDPOINT;
                }
                response = await fetch(PROMPT_END_POINT, options);
                const parsedResponse = await response.json();
                const res = parsedResponse.completions[0].data.text;
                arr.push([res, rand])
                // Devtool help
                console.log('Generated statement: ', res);
                // let list = res.split('\n');
                // setHeadings(list);
                // console.log(list); 
            });
        } catch (error) {
            console.error(error);
        } finally {
            setStatementsAreLoading(false);
            // shuffling headings
            arr.sort((a, b) => 0.5 - Math.random());
            setStatements(arr);
            // devTool
            console.log("STATEMENTS ARE GENERATED");
        }
    }, [setStatementsAreLoading, setStatements, text]);

    return {
        statements,
        generateStatements,
        statementsAreLoading
    }
}