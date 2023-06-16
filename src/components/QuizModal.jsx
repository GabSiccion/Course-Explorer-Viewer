import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import "./QuizModal.css";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function QuizModal({ questionsArray, setQuizModalOpen }) {
  let questions = questionsArray.slice();
  shuffle(questions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);

  useEffect(() => {
    console.log(questions.length);
  }, []);

  function answerSelected(e) {
    setCurrentQuestion(currentQuestion + 1);
    const selectedLetter = e.target.getAttribute("letter");
    if (selectedLetter === questions[currentQuestion]["correctchoice"]) {
      if (tracks.includes(questions[currentQuestion]["track"])) {
        let trackIndex = tracks.indexOf(questions[currentQuestion]["track"]);
        let scoresCopy = scores.slice();
        scoresCopy[trackIndex]++;
        setScores(scoresCopy);
      } else {
        setTracks((tracks) => [...tracks, questions[currentQuestion]["track"]]);
        setScores((scores) => [...scores, 1]);
      }
    } else {
      if (!tracks.includes(questions[currentQuestion]["track"])) {
        setTracks((tracks) => [...tracks, questions[currentQuestion]["track"]]);
        setScores((scores) => [...scores, 0]);
      }
    }
  }

  //quiz in process
  if (currentQuestion < questions.length) {
    return (
      <div className="quiz-modal-background">
        <div className="quiz-modal-container">
          <div className="quiz-modal-body">
            <div className="track-container">
              <p className="track mb-3">
                {currentQuestion + 1} Question for:
                {questions[currentQuestion]["track"]}
              </p>
            </div>
            <div className="question-container">
              <p className="question mb-3">
                {questions[currentQuestion]["question"]}
              </p>
            </div>
            <div className="choices-container">
              <button
                letter="a"
                onClick={(e) => {
                  answerSelected(e);
                }}
              >
                {questions[currentQuestion]["choices"]["a"]}
              </button>
              <button
                letter="b"
                onClick={(e) => {
                  answerSelected(e);
                }}
              >
                {questions[currentQuestion]["choices"]["b"]}
              </button>
              <button
                letter="c"
                onClick={(e) => {
                  answerSelected(e);
                }}
              >
                {questions[currentQuestion]["choices"]["c"]}
              </button>
              <button
                letter="d"
                onClick={(e) => {
                  answerSelected(e);
                }}
              >
                {questions[currentQuestion]["choices"]["d"]}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    console.log(tracks);
    console.log(scores);
    return (
      <div className="quiz-modal-background">
        <div className="quiz-modal-container">
          <div className="quiz-modal-body">
            <button
              onClick={() => {
                setQuizModalOpen(false);
                setCurrentQuestion(0);
                setScores([]);
                setTracks([]);
                setQuizEnd(false);
              }}
            >
              X
            </button>
            <p className="fs-4">You have finished the quiz</p>
            {tracks.map((track, index) => {
              return (
                <p className="m-1 fs-5">
                  {track}: {scores[index]}
                </p>
              );
            })}
            <p className="m-1 fs-5">
              Total Score: {getSumOfArray(scores)}/{questions.length}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function getSumOfArray(array) {
  let sum = 0;
  array.map((num) => {
    sum = sum + num;
  });
  return sum;
}

export default QuizModal;
