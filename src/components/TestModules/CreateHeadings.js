import React from 'react';
import { useState, useEffect } from 'react';
import './CreateHeadings.css'

export default function CreateHeadingsTest(props) {
    // amount of paragraphs
    const options = Array.from(Array(26).keys());

    return (
        <>
            <div hidden id="divTestModule1" className="headersArea">
                {props.headings.map((el, i) => {
                    if (el.length > 1)
                        return (
                            <>
                                <p key={"heading" + i}>
                                    <b>{i + 1 + ". "}</b>
                                    {el[0]}
                                    <CreateSelector
                                        key={"headerSelector" + i}
                                        i={i}
                                        options={options}
                                        headings={props.headings}
                                        name={String.fromCharCode(65 + i) + ". "} />
                                </p>
                            </>
                        )
                })}
            </div>
        </>
    )
}

function CreateSelector(props) {
    return (
        <>
            <select
                className="selectHeadingsArea"
                key={"selectHeadings" + props.i}
                name={props.name}
                id={"selectHeadings" + props.i}>
                {props.headings.map((nothing, i) => {
                    let el = props.options[i];
                    return (
                        <option key={"menuItemHeading" + props.i + el}
                            value={el}>
                            {String.fromCharCode(65 + el)}
                        </option>
                    )
                })}
            </select>
        </>
    )
}