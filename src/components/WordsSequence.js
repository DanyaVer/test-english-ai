import React, { useState, useEffect } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useTextGenerator } from '../AIRequests/hooks/MakeText.js';
import CreateTests from './TestModules/CreateTests';
import './WordsSequence.css';

export default function WordsSequence() {
  const [wordsSequence, setWordsSequence] = useState("");
  const onChangeWordsSequnce = e => {
    setWordsSequence(e.target.value);
  };
  // Reset Input Field handler
  const resetWordsSequence = () => {
    setWordsSequence("");
  };

  const { text, textIsLoading, generateText } =
    useTextGenerator(wordsSequence);

  return (
    <>
      <div className='text'>
        <p>Generate unique text using AI </p>
        <p>by entering a few words!</p>
      </div>
      <div className='textField'>
        <input
          className='input'
          id='textFieldWords'
          value={wordsSequence}
          onChange={onChangeWordsSequnce}
          placeholder="Write a sequence of words"
        />
        <IconButton
          className="iconButton"
          type="button"
          aria-label="autorenew"
          size="large"
          sx={{
            height: "100%",
            width: "50px",
            color: "white",
            backgroundColor: "hsla(0, 0%, 85%, 0.4)",
            "&:hover": { backgroundColor: "hsla(0, 0%, 85%, 0.3)" }
          }}
          onClick={() => resetWordsSequence()}>
          <AutorenewIcon fontSize="large" className="iconColor" />
        </IconButton>

        <LoadingButton
          className="btnGenerate"
          variant="contained"
          size="large"
          loading={textIsLoading}
          sx={{
            fontFamily: "Jost, sans-serif",
            borderRadius: "56px",
            background: "hsl(43, 100%, 57%)",
            "&:hover": { backgroundColor: "hsla(43, 100%, 57%, 0.8)" }
          }}
          onClick={() => {
            console.log(wordsSequence);
            generateText();
          }}>
          Generate
        </LoadingButton>
      </div>
      <div className="textArea">
        {text.map((el, index) => {
          if (el.length > 1)
            return (
              <p key={index}>
                <b>{String.fromCharCode(65 + index) + ". "}</b>
                {el}
              </p>
            )
        })}
      </div>
      {text.length > 0 && <CreateTests text={text} />}
    </>

  )
}