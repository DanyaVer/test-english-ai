import React from "react";
import "./Results.css";

export default function ShowResults(props) {
  return (
    <>
      <div className="results">
        <h3>
          {"Headings: " +
            props.resultHeadings.correct +
            "/" +
            props.resultHeadings.amount}
        </h3>
        <h3>
          {"Statements: " +
            props.resultStatements.correct +
            "/" +
            props.resultStatements.amount}
        </h3>
      </div>
    </>
  );
}
