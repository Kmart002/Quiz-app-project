import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import HtmlQuestion from '../../HtmlQuestion.json';
import './Play.css';
import { Helmet } from 'react-helmet'
import { FaHeartbeat } from 'react-icons/fa';
import newFifty from '../../asests/newFifty.png';
import { FaClock } from 'react-icons/fa';
import buttonSound from '../../asests/sound/button-124476.mp3';
import correctSound from '../../asests/sound/decidemp3-14575.mp3';
import wrongSound from '../../asests/sound/buzzer-or-wrong-answer-20582.mp3';


const Play = () => {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [hints, setHints] = useState(5);
  // const [options, setOptions] = useState([
  //   {     
  //       optionA: " ",
  //       optionB: " ", 
  //       optionC: " ", 
  //       optionD: " ",
      
  //   },
  // ]);
  const [remainingFiftyFifty, setRemainingFiftyFifty] = useState(2);
  const [isFiftyFiftyClicked, setIsFiftyFiftyClicked] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    countdownTime: Date.now() + 180000
  });

  useEffect(() => {
    startTimer();
  }, []);

  const currentQuestion = Array.isArray(HtmlQuestion) ? HtmlQuestion[currentQuestionIndex] : [];

  const goToNextQuestion = () => {
    showOptions();
    playButtonSound();
    if (currentQuestionIndex < HtmlQuestion.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    playButtonSound();
    if (currentQuestionIndex > 0) {
      setcurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));
    options.forEach((option) => {
      option.style.visibility = 'visible';
    });
  };

  const handleHints = () => {
    if (hints > 0){
      const options = Array.from(document.querySelectorAll('.option'));
      // Getting the index of the option that have the correct answer
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (option.innerHTML === currentQuestion.answer) {
          indexOfAnswer = index;
        }
      });
      let usedIndices = []; // Initialize an array to store used indices

      while (true) {
        // Generate a unique random index for hiding
        const randomNumber = Math.round(Math.random() * 3);
        console.log(randomNumber);
        if (randomNumber !== indexOfAnswer && !usedIndices.includes(randomNumber)) {
          usedIndices.push(randomNumber); // Store the used index
          console.log(usedIndices);
          options[randomNumber].style.visibility = 'hidden';
          setHints(hints - 1);
          let updatedUsedIndices = usedIndices.concat(randomNumber);
          
           
          break;
        }
      }
    }
  };

  // const handleHints = () => {
  //   if (hints > 0) {
  //     const incorrectOptions = options.filter(option => {return option !== currentQuestion.answer});
  //     const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      
  //     const updatedOptions = options.map(option => {
  //       if (option === randomIncorrectOption) {
  //         return '';
  //       }
  //       return option;
  //     });
      
  //     setOptions(updatedOptions);
  //     setHints(hints - 1);
  //     console.log(incorrectOptions);
  //     // console.log(updatedOptions);
  //   }
  // };

  // const handleHints = () => {
  //   if (hints > 0) {
  //     // Find the current question object based on the current question index or other logic
  //     // const currentQuestion = question[currentQuestionIndex]; // Replace currentQuestionIndex with actual logic
      
  //     // Create a new options array with incorrect options removed
  //     const updatedOptions = options.map(option => {
  //       if (option === HtmlQuestion.answer) {
  //         return option; // Keep the correct option
  //       }
  //       return null; // Replace incorrect options with null
  //     });
  //     console.log(option);
  //     // Randomly select an incorrect option index to re-add
  //     const incorrectOptions = updatedOptions.filter(option => option === null);
  //     const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
  //     const indexToReAdd = updatedOptions.indexOf(null);
      
  //     // Re-add a randomly selected incorrect option
  //     updatedOptions[indexToReAdd] = incorrectOptions[randomIndex];
      
  //     setOptions(updatedOptions);
  //     setHints(hints - 1);
  //   }
  // };

  
  const handleFiftyFiftyClick = ()=> {
    if (remainingFiftyFifty > 0 && !isFiftyFiftyClicked) {
      setIsFiftyFiftyClicked(true);
  
      const shuffledOptions = displayedOptions.slice().filter(option => option !== currentQuestion.answer);
      const randomIndicesToRemove = [
        Math.floor(Math.random() * shuffledOptions.length),
        Math.floor(Math.random() * (shuffledOptions.length - 1))
      ];
  
      const newDisplayedOptions = displayedOptions.map((option, index) => {
        if (randomIndicesToRemove.includes(index)) {
          return '';
        }
        return option;
      });
  
      setDisplayedOptions(newDisplayedOptions);
      setRemainingFiftyFifty(remainingFiftyFifty - 1);
    }
  }

  const startTimer = () => {
    const countdownTime = Date.now() + 180000;
    const interval = setInterval(() => {
      const now = new Date();
      const distance = countdownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval);
        // alert('Quiz has ended');
      } else {
        setTime({
          minutes,
          seconds,
          countdownTime
        });
      }
    }, 1000);
  };
     
  
  const handleOptionClicked = (selectedOption) => {
    if (currentQuestionIndex < HtmlQuestion.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    }
    const optionClicked = currentQuestion.answer
    if (selectedOption === optionClicked ) {
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 500);
      correctAnswer();
    }else {  
      wrongAnswer();
      document.getElementById('wrong-answer').play();
    }
  };

  const playButtonSound = () => {
    document.getElementById('button-sound').play();
  }
    const correctAnswer = () => {
      M.toast({
        html: 'correct answer',
        classes: 'toast-valid',
        displayLength: '1500'
      });
    }

    const wrongAnswer = () => {
      navigator.vibrate(1000)
      M.toast({
        html: 'wrong answer',
        classes: 'toast-invalid',
        displayLength: '1500'
      });
    }

  // console.log('hints');

  return (
    <>
      <Helmet>
        <title>Quiz App</title>
    </Helmet>

    <div>
      <audio id='button-sound' src={buttonSound}></audio>
      <audio id='correct-sound' src={correctSound}></audio>
      <audio id='wrong-answer' src={wrongSound}></audio>
      {/* <audio id='success' src={successSound}></audio> */}
    </div> 

      <div className='questions'>

        <h2>Quiz Mode</h2>

        <div className='lifeline-container'>
          <span onClick={handleFiftyFiftyClick} disabled={remainingFiftyFifty === 0 || isFiftyFiftyClicked}><FaHeartbeat /> <span className='num'>{remainingFiftyFifty}</span></span>

          <span onClick={handleHints}>
        <img src={newFifty} alt="50/50 Icon" style={{ height: '18px' }} />
        <span className='num'>{hints}</span> </span>
        </div>

        <div>
          <p>
            <span className='right'>{time.minutes}:{time.seconds}<span><FaClock /></span></span>
          </p>
        </div>

        <h4>Question{currentQuestionIndex + 1}</h4>
        <h5>{currentQuestion.question}</h5>

        <div className='options-container'>

        <button className='option' onClick={() => handleOptionClicked(currentQuestion.optionA)}> {currentQuestion.optionA}</button>
        <button className='option' onClick={() => handleOptionClicked(currentQuestion.optionB)}> {currentQuestion.optionB}</button>

          </div>

        <div className='options-container'>

        <button className='option' onClick={() => handleOptionClicked(currentQuestion.optionC)}> {currentQuestion.optionC}</button>
        <button className='option' onClick={() => handleOptionClicked(currentQuestion.optionD)}> {currentQuestion.optionD}</button>
  
          </div>

        <div className='button-container'>

          
          <button onClick={goToPreviousQuestion}  style={{ display: currentQuestionIndex === 0 ? "none" : "block" }}>Previous</button>
          <button onClick={goToNextQuestion} disabled={currentQuestionIndex === HtmlQuestion.length - 1} 
          style={{ display: currentQuestionIndex === HtmlQuestion.length - 1 ? "none" : "block" }} >
            Next
            </button>
          <Link to="/Header"><button>Submit</button></Link>
        </div>
      </div>

    </>

  )
}

 export default Play;