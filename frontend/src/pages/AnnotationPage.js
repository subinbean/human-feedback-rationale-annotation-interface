import { useState, useEffect } from "react";
import ContextQuestion from "../components/ContextQuestion";
import "./pagesStyle.css";
import RationaleAnswer from "../components/RationaleAnswer";
import { Button, Alert, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AnnotationPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;
    const [seconds, setSeconds] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentRationale, setCurrentRationale] = useState(0);

    const emptyRationale = {
        sufficiency: "",
        faithfulness: "",
        predicted_answer_correct: false,
        nl_feedback_error: "",
        nl_feedback_fix: "",
        feedback_ease: "",
        time_taken: 0,
    };
    const [rationaleAnnotation, setRationaleAnnotation] =
        useState(emptyRationale);
    const [missingFields, setMissingFields] = useState([]);

    useEffect(() => {
        setSeconds(new Date());
    }, []);

    const buttonInstructions = () => {
        if (currentRationale < data[currentQuestion].rationales.length - 1) {
            return <div> Move onto the next rationale below! </div>;
        } else if (currentQuestion < data.length - 1) {
            return (
                <div>
                    {" "}
                    Submit your final rationale and move onto the next question!
                </div>
            );
        } else {
            return (
                <div>
                    {" "}
                    You are now done with all the questions and this task! Press
                    submit for the completion code.{" "}
                </div>
            );
        }
    };

    const buttonText = () => {
        if (currentRationale < data[currentQuestion].rationales.length - 1) {
            return (
                <Button
                    variant="outline-primary"
                    style={{ marginLeft: "520px" }}
                    onClick={buttonAction()}>
                    {" "}
                    Submit rationale{" "}
                </Button>
            );
        } else if (currentQuestion < data.length - 1) {
            return (
                <Button
                    variant="outline-primary"
                    style={{ marginLeft: "495px" }}
                    onClick={buttonAction()}>
                    {" "}
                    Submit question{" "}
                </Button>
            );
        } else {
            return (
                <Button
                    variant="outline-primary"
                    style={{ marginLeft: "390px" }}
                    onClick={buttonAction()}>
                    {" "}
                    Submit question and finish task{" "}
                </Button>
            );
        }
    };

    const submitRationale = () => {
        // validation logic
        const new_array = [];
        const mapping = {
            sufficiency: "Sufficiency",
            faithfulness: "Faithfulness",
            predicted_answer_correct: "Is the predicted answer right?",
            nl_feedback_error: "Feedback for Rationale: Error ",
            nl_feedback_fix: "Feedback for Rationale: Fixes",
            feedback_ease: "Ease of Providing Feedback",
        };
        for (var field in rationaleAnnotation) {
            if (rationaleAnnotation[field] === "") {
                new_array.push(mapping[field]);
            }
        }
        setMissingFields(new_array);
        if (new_array.length > 0) {
            return;
        }

        console.log(rationaleAnnotation);

        const endTime = new Date();
        // api call
        axios
            .patch(
                `/api/annotate/question/${data[currentQuestion]._id}/rationale/${currentRationale}`,
                {
                    ...rationaleAnnotation,
                    time_taken: endTime - seconds,
                }
            )
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => console.log(error));

        // rescroll & state updates
        setSeconds(endTime);
        setRationaleAnnotation(emptyRationale);
    };

    const buttonAction = () => {
        // submit claim
        if (currentRationale < data[currentQuestion].rationales.length - 1) {
            return () => {
                submitRationale();
                setCurrentRationale(currentRationale + 1);
                const element = document.getElementById(
                    "rationale-answer-section"
                );
                element.scrollIntoView({ behavior: "smooth" });
            };
        }
        // submit question
        else {
            if (currentQuestion < data.length - 1) {
                return () => {
                    submitRationale();
                    // rescroll & state updates
                    setCurrentRationale(0);
                    setCurrentQuestion(currentQuestion + 1);
                    window.scrollTo(0, 0);
                };
            }
            // submit final question
            else {
                return () => {
                    submitRationale();
                    navigate("/submission");
                };
            }
        }
    };

    const renderRationaleAnswer = () => {
        return (
            <div id="rationale-answer-section">
                <Alert
                    style={{
                        width: "40rem",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    <p>
                        You are on <b> question {currentQuestion + 1}</b>. This
                        question has{" "}
                        <b>
                            {" "}
                            {data[currentQuestion].rationales.length}{" "}
                            rationales.{" "}
                        </b>
                    </p>
                    <p>
                        Current Rationale: {currentRationale + 1} out of{" "}
                        {data[currentQuestion].rationales.length}
                    </p>
                    <ProgressBar
                        variant="primary"
                        now={
                            ((currentRationale + 1) * 100.0) /
                            data[currentQuestion].rationales.length
                        }
                        style={{ width: "38rem", marginTop: "20px" }}
                    />
                </Alert>
                <RationaleAnswer
                    rationale={
                        data[currentQuestion].rationales[currentRationale]
                            .rationale_string
                    }
                    rationale_format={
                        data[currentQuestion].rationales[currentRationale]
                            .rationale_format
                    }
                    correct_answer={data[currentQuestion].reference_answer}
                    predicted_answer={
                        data[currentQuestion].rationales[currentRationale]
                            .predicted_answer
                    }
                    currentRationale={currentRationale}
                    rationaleAnnotation={rationaleAnnotation}
                    setRationaleAnnotation={setRationaleAnnotation}
                />
            </div>
        );
    };

    const renderAlert = () => {
        if (missingFields.length > 0) {
            return (
                <Alert
                    variant="danger"
                    style={{
                        width: "40rem",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    {" "}
                    Please submit the following required fields before
                    submitting: {missingFields.join(", ")}{" "}
                </Alert>
            );
        }
    };

    return (
        <div align="center">
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    {" "}
                    <h3> Providing Feedback for AI Outputs </h3>
                </p>
                <p>
                    This task has <b> {data.length} questions. </b>
                </p>
                Current Question: {currentQuestion + 1} out of {data.length}
                <ProgressBar
                    variant="primary"
                    now={((currentQuestion + 1) * 100.0) / data.length}
                    style={{
                        width: "38rem",
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                />
                <p>
                    {" "}
                    Make sure to <b> follow the instructions carefully </b> and
                    submit all the questions! If an <b>error</b> occurs in the
                    interface, just click on the link again and provide your ID.{" "}
                </p>
            </Alert>
            <ContextQuestion
                context={data[currentQuestion].context}
                question={data[currentQuestion].question}
            />
            {renderRationaleAnswer()}
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                {buttonInstructions()}
            </Alert>
            {renderAlert()}
            <div className="buttons">{buttonText()}</div>
        </div>
    );
};

export default AnnotationPage;
