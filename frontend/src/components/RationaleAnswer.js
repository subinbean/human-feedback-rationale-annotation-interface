import Textbox from "./Textbox";
import Likert from "./Likert";
import Answerbox from "./Answerbox";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import "./componentStyle.css";

const showRationaleExamples = () => {
    return (
        <Alert
            style={{
                width: "40rem",
                marginTop: "20px",
                textAlign: "left",
            }}>
            <b>Markup-And-Mask:</b> A set of extracted sentences from the
            context which are additionally marked up with what pronouns and
            ambiguous phrases refer to, in square brackets. etc.etc. too tired
            to type anymore
        </Alert>
    );
};

const RationaleAnswer = (props) => {
    const [showExample, setShowExample] = useState(false);
    const [hideFeedback, setHideFeedback] = useState(false);

    return (
        <div>
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    Note that rationales can be presented to you in different
                    formats (the accompanying examples are all sufficient and
                    faithful to the context):
                </p>
                <Button
                    variant="primary"
                    onClick={() => setShowExample(!showExample)}>
                    {showExample ? <b>Hide Example </b> : <b> Show Example</b>}
                </Button>
            </Alert>
            {showExample ? showRationaleExamples() : <></>}
            <Textbox
                title="Rationale"
                text={props.rationale}
                format={props.rationale_format}
            />
            <Textbox title="Correct Answer" text={props.correct_answer} />
            <Textbox title="Predicted Answer" text={props.predicted_answer} />
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    For a given rationale, the task requires you to answer the
                    following questions:
                </p>
                <p>
                    <b>Sufficiency</b>: Is the rationale sufficient to answer
                    the question? <br></br> The given rationale should contain
                    enough information to answer the question using the
                    rationale alone, without using the context. Note that the
                    rationale may contain inaccuracies in information but could
                    still contain sufficient information to determine an answer.
                    <ol type="a">
                        <li>
                            {" "}
                            Sufficient: The Rationale is{" "}
                            <b> entirely sufficient </b> to answer the question.
                        </li>
                        <li>
                            A bit insufficient: The Rationale contains most of
                            the information, but misses minor information that
                            could be useful to answer the question.{" "}
                        </li>
                        <li>
                            Entirely insufficient: The Rationale misses key
                            information from the context, required to answer the
                            question.
                        </li>
                    </ol>
                </p>
            </Alert>
            <Likert
                title="Sufficiency"
                options={[
                    "Sufficient",
                    "A bit insufficient",
                    "Entirely insufficient",
                ]}
                toChange="sufficiency"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>Faithfulness to context:</b> Does the information in the
                    rationale accurately represent information in the context?{" "}
                    <br></br>The given rationale should be faithful to the
                    context, that is, it should accurately draw conclusions from
                    the information presented without misrepresenting any
                    information. Note that we are only judging whether the
                    rationale is faithful to the context, so not all information
                    sufficient to answer the question may be present in the
                    rationale for it to be accurate.
                    <ol type="a">
                        <li>
                            {" "}
                            Accurate: The Rationale is completely faithful to
                            the context.
                        </li>
                        <li>
                            A bit inaccurate: The Rationale misrepresents minor
                            information or makes minor incorrect conclusions
                            from the context.
                        </li>
                        <li>
                            Very inaccurate: The Rationale misrepresents
                            significant information or draws incorrect
                            conclusions from the context.
                        </li>
                    </ol>
                </p>
            </Alert>
            <Likert
                title="Faithfulness"
                options={["Accurate", "A bit accurate", "Very inaccurate"]}
                toChange="faithfulness"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>
                        {" "}
                        Insert something here to tell users about the disabling
                        thing{" "}
                    </b>
                </p>
            </Alert>
            <Likert
                title="Is the predicted answer correct?"
                options={["Agree", "Disagree"]}
                toChange="predicted_answer_correct"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
                hideFeedback={hideFeedback}
                setHideFeedback={setHideFeedback}
            />
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>Feedback:</b> Write natural language feedback to fix the
                    rationale. This feedback could target any missing
                    information or any incorrect information in the rationale.
                    The feedback should first i) localize the step in which the
                    error(s) occur, then ii) describe the error and iii) provide
                    an actionable suggestion to fix the error. **Make sure to
                    not include the correct answer in your feedback
                    explicitly.**
                </p>
            </Alert>
            <Answerbox
                text="Feedback for Rationale: Error"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
                toChange="nl_feedback_error"
            />
            <Answerbox
                text="Feedback for Rationale: Fixes"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
                toChange="nl_feedback_fix"
            />
            <Alert
                style={{
                    width: "40rem",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>
                        How easy did you find providing feedback for this
                        rationale?
                    </b>{" "}
                    <ol type="a">
                        <li>
                            Very easy: It was straightforward to identify the
                            issue with the rationale, and provide an actionable
                            suggestion.
                        </li>
                        <li>
                            Somewhat easy: It took a bit of effort to localize /
                            describe the issue or formulate actionable feedback.
                        </li>
                        <li>
                            Somewhat hard: It was hard to localize / describe
                            the issue, or write actionable feedback.
                        </li>
                        <li>
                            Very hard: It took a lot of effort to localize /
                            describe the issue and write actionable feedback.
                        </li>
                    </ol>
                </p>
            </Alert>
            <Likert
                title="Ease of Providing Feedback"
                options={[
                    "Very easy",
                    "Somewhat easy",
                    "Somewhat hard",
                    "Very hard",
                ]}
                toChange="feedback_ease"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />
        </div>
    );
};

export default RationaleAnswer;
