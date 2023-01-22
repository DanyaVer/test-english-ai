import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import './TestButtons.css';

export default function CreateTestingModule(props) {
    // colors: 1 - text, 2 - background, 3 - border
    let colors = [["#FF4845", "none", "#FF4845"], ["#4056FF", "none", "#4056FF"],
    ["#FFC123", "none", "#FFC123"], ["#07E1AC", "none", "#07E1AC"]];
    // 1 - name, 2 - colors
    let buttonsProp = [["Headings", colors[0]], ["True/False/Not given", colors[1]],
    ["Match", colors[2]], ["Multiple Choice", colors[3]]];
    const [modules, setModules] = useState(buttonsProp);

    useEffect(() => {
        let tmp = buttonsProp;
        if (props.chosenModule)
            tmp[props.chosenModule - 1][1] =
                ["white", colors[props.chosenModule - 1][2],
                    colors[props.chosenModule - 1][2]];
        setModules(tmp);
    }, [props.chosenModule]);

    return (
        <>
            <div className='testButtons'>
                <CreateButton prop={modules[0]} btnNum={1}
                    chosenModule={props.chosenModule}
                    setChosenModule={props.setChosenModule} />
                <CreateButton prop={modules[1]} btnNum={2}
                    chosenModule={props.chosenModule}
                    setChosenModule={props.setChosenModule} />

                {/* ARE NOT USABLE
                <CreateButton prop={modules[2]} btnNum={3}
                    chosenModule={props.chosenModule}
                    setChosenModule={props.setChosenModule} />
                <CreateButton prop={modules[3]} btnNum={4}
                    chosenModule={props.chosenModule}
                    setChosenModule={props.setChosenModule} /> */}
            </div>
        </>
    )
}

function CreateButton(props) {
    return (
        <Button
            className={"btnModule" + props.btnNum}
            id={props.btnNum}
            variant="outlined"
            size="large"
            sx={{
                fontFamily: "Jost, sans-serif",
                fontSize: "20px", 
                mr: "87px",
                my: "5px",
                border: 2,
                borderRadius: "56px",
                transition: "0.4s",
                color: props.prop[1][0],
                background: props.prop[1][1],
                borderColor: props.prop[1][2],
                "&:hover": {
                    border: 2,
                    color: "white",
                    background: props.prop[1][2],
                    borderColor: props.prop[1][2]
                }
            }}
            onClick={() => {
                // making previous module hidden
                if (props.chosenModule !== 0)
                    document.getElementById("divTestModule" + props.chosenModule).style.display = "none";
                
                if (props.chosenModule !== props.btnNum) {
                    // making current module visible
                    props.setChosenModule(props.btnNum)
                    document.getElementById("divTestModule" + props.btnNum).style.display = "block";
                }
                else {
                    props.setChosenModule(0)
                }
            }}>
            {props.prop[0]}
        </Button>
    )
}
