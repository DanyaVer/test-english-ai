import React from "react";
import { ContextExclusionPlugin } from "webpack";
import "./CreateStatements.css";

export default function CreateStatementsTest(props) {
  // amount of paragraphs
  const options = ["True", "False", "Not given"];
  return (
    <>
      <div hidden id="divTestModule2" className="statementsArea">
        {props.statements.map((el, i) => {
          if (el.length > 1)
            return (
              <>
                <p key={"statement" + i}>
                  <b>{i + 1 + ". "}</b>
                  {el[0]}
                  <CreateSelector
                    key={"statementSelector" + i}
                    i={i}
                    options={options}
                    name={String.fromCharCode(65 + i) + ". "}
                  />
                </p>
              </>
            );
        })}
      </div>
    </>
  );
}

function CreateSelector(props) {
  return (
    <>
      <select
        className="selectStatementsArea"
        key={"selectStatements" + props.i}
        name={props.name}
        id={"selectStatements" + props.i}
      >
        {props.options.map((el, i) => {
          console.log("menuItemStatement" + props.i + "" + i);
          return (
            <option key={"menuItemStatement" + props.i + "" + i} value={i}>
              {el}
            </option>
          );
        })}
      </select>
    </>
  );
}
