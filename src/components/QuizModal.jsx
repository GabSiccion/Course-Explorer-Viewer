import { useEffect, useContext, useState } from "react";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { getDocs, query, collection, addDoc, where } from "firebase/firestore";
import { LoginContext } from "../helper/LoginContext";
import { db } from "../config/Firebase";
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

  const { selectedCourse, selectedCourseName } = useContext(
    SelectedCourseContext
  );
  const { loginState } = useContext(LoginContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [quizAnswered, setQuizAnswered] = useState(false);

  useEffect(() => {
    const checkIfUserAnsweredAlready = async () => {
      const quizAlreadyAnsweredQuery = query(
        collection(db, "scores"),
        where("userName", "==", loginState["userName"]),
        where("courseName", "==", selectedCourseName)
      );
      const checkQuiz = await getDocs(quizAlreadyAnsweredQuery);
      if (checkQuiz.empty) {
        return false;
      } else {
        return true;
      }
    };
    setQuizAnswered(checkIfUserAnsweredAlready());
  }, []);

  async function saveScore() {
    let score = Math.round((getSumOfArray(scores) / questions.length) * 100);
    console.log(score);

    if (!quizAnswered) {
      await addDoc(collection(db, "scores"), {
        userName: loginState.userName,
        course: selectedCourseName,
        score: score,
        recommendation: tracks[findIndexOfHighestScore(scores)],
      }).then(alert("Your score has been saved."));
    } else {
      alert(
        "You have answered the quiz before, your score has not been recorded."
      );
    }
  }

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
              <p className="question mb-3 fs-4">
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
    return (
      <div className="quiz-modal-background">
        <div className="quiz-modal-container">
          <div className="quiz-modal-body">
            <button
              onClick={() => {
                saveScore();
                setCurrentQuestion(0);
                setScores([]);
                setTracks([]);
                setQuizModalOpen(false);
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
            <p className="m-1 fs-5">
              Highest scoring track: {tracks[findIndexOfHighestScore(scores)]}
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

function findIndexOfHighestScore(arr) {
  if (arr.length === 0) {
    return -1; // Return -1 for an empty array
  }

  let maxNumber = arr[0];
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxNumber) {
      maxNumber = arr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}

export default QuizModal;
