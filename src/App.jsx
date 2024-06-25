import {useState} from "react";
import'./css/index.css'
const quizQuestions = [
  {
    question: "Quelle est la capitale de la France ?",
    choices: ["Paris", "Lyon", "Marseille", "Toulouse"],
    correctAnswer: "Paris"
  },
  {
    question: "Qui a écrit le livre '1984' ?",
    choices: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Philip K. Dick"],
    correctAnswer: "George Orwell"
  },
  {
    question: "Quel est le plus grand mammifère au monde ?",
    choices: ["Éléphant", "Baleine bleue", "Girafe", "Ours polaire"],
    correctAnswer: "Baleine bleue"
  },
  {
    question: "Qui a peint la Joconde ?",
    choices: ["Leonard de Vinci", "Michel-Ange", "Vincent Van Gogh", "Pablo Picasso"],
    correctAnswer: "Leonard de Vinci"
  },
  {
    question: "Quel est le symbole chimique de l'or ?",
    choices: ["AU", "AG", "GA", "GS"],
    correctAnswer: "AU"
  }
];
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[0])
  const [score, setScore] = useState(0)
  const [finishQuizz, setFinishQuizz] = useState(false)
  const handleNextQuestion = (response)=>{
    if(response === currentQuestion.correctAnswer){
      let new_score = score +1
      setScore(new_score)
    }
    let numQ = quizQuestions.indexOf(currentQuestion) +1
    if(numQ === quizQuestions.length){
      setCurrentQuestion(quizQuestions[0])
      setFinishQuizz(true)
    }
    else{
      const nextQuestion = quizQuestions[numQ]
      setCurrentQuestion(nextQuestion)
    }

  }
  const handleResetQuizz = ()=>{
    setFinishQuizz(false)
    setScore(0)
  }
  let numQuestion = quizQuestions.indexOf(currentQuestion)+1
  return <div className='container w-50'>
    {!finishQuizz?
      <>
      <QuizzHeader
            currentQuestion={currentQuestion}
            numQuestion={numQuestion}
        />
        <QuizzBody
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
        />
      </>
        :
      <>
        <ResultQuizz score={score} resetQuiz={handleResetQuizz} />
      </>
    }



  </div>
}
function QuizzHeader({currentQuestion,numQuestion}){
  return <div>
    <h1 className='fw-bold text-center'>Quizz</h1>
    <span>
      <h4 className='numQuestion'>Question numéro {numQuestion}</h4>
      <h4 className='my-4 h2 titre-question fw-semibold'>{currentQuestion.question}</h4>
    </span>
  </div>
}

function QuizzBody({currentQuestion, handleNextQuestion}){

  // let responses ={currentQuestion.choices.map(element=><li key={element}>{element}</li> )}
  return <ul className='list-unstyled'>
    {currentQuestion.choices.map((el, i)=><li onClick={()=>handleNextQuestion(el)}  key={el} className='question'><span className="numQuestion">{i+1}</span>{el}</li>)}
  </ul>
}
function ResultQuizz({resetQuiz, score}){
  return <div className='result'>
    <div>
      <h1 className='text-center'>Terminer !</h1>
      <div className="box-result">
        {score}/5
      </div>
      <button className='mx-auto'onClick={resetQuiz} >Recommencer</button>
    </div>

  </div>
}

export default App
