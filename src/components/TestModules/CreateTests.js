import { useState, useEffect } from 'react';
import { useHeadingGenerator } from '../../AIRequests/hooks/MakeHeading.js';
import { useStatementsGenerator } from '../../AIRequests/hooks/MakeStatements';
import CreateHeadingsTest from './CreateHeadings'
import CreateStatementsTest from './CreateStatements'
import CreateTestingModule from './TestButtons'
import SubmitResults from '../Results'
import Button from '@mui/material/Button';
import './CreateTests.css';

export default function CreateTests(props) {
    const [chosenModule, setChosenModule] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const { headings, headingIsLoading, generateHeading } =
        useHeadingGenerator(props.text);
    const { statements, statementsAreLoading, generateStatements } =
        useStatementsGenerator(props.text);
    const [answersHeadings, setAnswersHeadings] = useState([]);

    const [resultHeadings, setResultHeadings] = useState(0);
    const [resultStatements, setResultStatements] = useState(0);

    useEffect(() => {
        if (props.text.length > 1) {
            setChosenModule(0);
            setSubmitted(false);
            document.getElementById("divTestModule1").style.display = "none";
            document.getElementById("divTestModule2").style.display = "none";
            generateHeading(props.text);
            generateStatements(props.text);
        }
    }, [props.text])
    return (
        <>
            <CreateTestingModule
                chosenModule={chosenModule}
                setChosenModule={setChosenModule} />
            <CreateHeadingsTest headings={headings} />
            <CreateStatementsTest statements={statements} />
            {/* {chosenModule === 3 && <CreateHeadingsTest />} */}
            {/* {chosenModule === 4 && <CreateHeadingsTest />} */}

            <Button
                className="btnSubmit"
                id="btnSubmit"
                variant="contained"
                size="large"
                sx={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: 20,
                    mr: "87px",
                    my: "20px",
                    borderRadius: "56px",
                    transition: "0.4s",
                    color: "light-grey",
                    background: "#00D4A6",
                    "&:hover": {
                        color: "white",
                        background: "grey"
                    }
                }}
                onClick={() => {
                    setSubmitted(true);
                    ChangeResults(headings, statements, setResultHeadings, setResultStatements);
                }}>
                Submit
            </Button>
            {submitted && <div className="results">
                <h3>
                    {"Headings: " + resultHeadings + "/" + headings.length}
                </h3>
                <h3>
                    {"Statements: " + resultStatements + "/" + statements.length}
                </h3>
            </div>}
        </>
    )

}

function ChangeResults(headings, statements, setResultHeadings, setResultStatements) {
    let res1 = 0;
    for (let i = 0; i < headings.length; i++) {
        var selectHeading = document.getElementById("selectHeadings" + i);
        if (selectHeading.value.toString() === headings[i][1].toString()) {
            res1++;
            selectHeading.style.color = "#00D4A6";
        }
        else {
            selectHeading.style.color = "#FF4845";
        }
    }

    let res2 = 0;
    for (let i = 0; i < statements.length; i++) {
        var selectStatement = document.getElementById("selectStatements" + i);
        if (selectStatement.value.toString() === statements[i][1].toString()) {
            res2++;
            selectStatement.style.color = "#00D4A6";
        }
        else {
            selectStatement.style.color = "#FF4845";
        }
    }
    console.log("Headings: " + res1 + "/" + headings.length);
    console.log("Statements: " + res2 + "/" + statements.length);
    setResultHeadings(res1);
    setResultStatements(res2);
}