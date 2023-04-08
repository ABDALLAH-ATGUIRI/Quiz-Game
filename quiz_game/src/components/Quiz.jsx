import { Fragment, useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import { SelectedContext } from "../context/Selected";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [QuestionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const { isSelected } = useContext(SelectedContext)


    const handlePrevious = () => {
        const prevQues = QuestionNumber - 1;
        prevQues >= 0 && setQuestionNumber(prevQues);
    };

    const handleNext = () => {
        const nextQues = QuestionNumber + 1;
        if (nextQues < questions.length) {
            setQuestionNumber(nextQues)
        } else {
            alert("Quiz Completed ! Your Score is " + score + " out of " + questions.length + "")
            window.location.reload()
        }
    };

    const handleAnswer = (answer) => {
        const isCorrect = questions[QuestionNumber].correct_answer === answer;
        if (isCorrect) {
            setScore(score + 1);
        }
        isSelected({ isSelect: false, isCorrect })
        handleNext()
    };

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
                console.log(data.results)
                const answers = [
                    ...data.results[QuestionNumber].incorrect_answers,
                    data.results[QuestionNumber].correct_answer
                ];
                const shuffledAnswers = answers;
                setAnswers(shuffledAnswers);
            });
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const answers = [
                ...questions[QuestionNumber].incorrect_answers,
                questions[QuestionNumber].correct_answer
            ];
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            setAnswers(shuffledAnswers);
        }
    }, [QuestionNumber]);


    return (
        <Fragment>
            <div className="w-screen relative px-5 h-screen ">
                <div className="p-20">
                    <h1 className="text-5xl font-bold text-center text-white">Welcome to QUIZ APP</h1>
                </div>

                {questions.length > 0 && (
                    <div className="absolute bottom-auto left-auto mx-[19%] top-auto shadow-2xl flex flex-col w-3/5 h-[600px] mt-10 bg-salt-50/50">
                        <div className="flex items-center flex-col w-full h-full ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-t-xl">
                            <div className="flex items-start text-white/90 text-xl font-semibold w-full p-8 border-b-white bg-purple-800/80 rounded-t-xl">
                                <h4 className=" ">
                                    Question {QuestionNumber + 1} of {questions.length}
                                </h4>
                                <h4 className="ml-auto ">
                                    Score: {score}
                                </h4>
                                <h4 className="ml-auto ">
                                    level:{" "}
                                    <span
                                        className={` rounded-xl w-24 py-2 px-4 text-white font-bolder text-[16px]
                    ${questions[QuestionNumber].difficulty === "medium" &&
                                            "bg-orange-500"
                                            }
                    ${questions[QuestionNumber].difficulty === "easy" &&
                                            "bg-green-500"
                                            }
                    ${questions[QuestionNumber].difficulty === "hard" &&
                                            "bg-red-500"
                                            }`}
                                    >
                                        {questions[QuestionNumber].difficulty}
                                    </span>
                                </h4>
                            </div>
                            <div className=" w-full h-full">
                                <div className=" text-xl text-semibold text-center w-full  text-black bg-white p-4 font-normal mt-12">
                                    <h1>{questions[QuestionNumber].question}</h1>
                                </div>

                                <div className="w-full mt-10 flex flex-wrap gap-10 justify-around items-center">
                                    {answers.map((answer, index) => {
                                        return <Button title={answer} handle={handleAnswer} index={index} correctAnswer={questions[QuestionNumber].correct_answer} />;
                                    })}
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center text-base font-bold text-white justify-center w-full h-20">
                            <button
                                onClick={() => handlePrevious()}
                                className="w-full p-6 bg-orange-500 hover:bg-orange-300 rounded-bl-xl border-r-[0.5px]"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => handleNext()}
                                className="w-full p-6 bg-orange-500 hover:bg-orange-300 rounded-br-xl  border-l-[0.5px]"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default Quiz;
