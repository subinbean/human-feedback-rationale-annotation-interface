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
            <p>
                <h5>Markup and Mask:</h5> A set of extracted sentences from the
                context which are additionally marked up with what pronouns and
                ambiguous phrases refer to, in square brackets. <br></br>{" "}
                <br></br>
                Example) <br></br>
                <b>Sentence from context: </b>Amy went to the supermarket and
                bought 3 apples and 2 pears.” <br></br>{" "}
                <b>Sentence from context: </b>“Just before getting to the
                checkout line, she <b>[Amy]</b> picked up a watermelon.”
            </p>
            <p>
                <h5>Annotated Report</h5> A list of extracted phrases from the
                context and what each phrase indicates. <br></br> <br></br>
                Example) <br></br>
                <b>Sentence from context:</b> “bought 3 apples and 2 pears”{" "}
                <br></br>
                <b>Annotation:</b>
                Amy bought 5 fruits at first. <br></br> <br></br>
                <b>Sentence from context:</b> “she picked up a watermelon”{" "}
                <br></br>
                <b>Annotation:</b> Amy bought 1 other fruit.
            </p>
            <p>
                <h5>Procedural:</h5> A step-by-step plan of solving the question
                where each step can be one of the following operations:
                <ul>
                    <li>
                        Extract-relevant-sentences → extracts sentences from the
                        context relevant to answering the question)
                    </li>
                    <li>
                        Disambiguate-question-entity (s) → determines the
                        specific entity or phrase that the phrase s in the
                        question refers to
                    </li>
                    <li>
                        Disambiguate-plan-entity (s) → determines the specific
                        entity or phrase that the phrase s in the plan so far
                        refers to
                    </li>
                    <li>
                        Locate-entity (s) → Answers a subquestion s that is
                        important to answer the original question
                    </li>
                </ul>{" "}
                Example) <br></br>
                1) <b>Extract-relevant-sentences:</b> “Amy went to the
                supermarket and bought 3 apples and 2 pears.”, “Just before
                getting to the checkout line, she picked up a watermelon.”{" "}
                <br></br>
                2)<b> Disambiguate-plan-entity</b> (“she”): “Amy”. <br></br> 3){" "}
                <b>Locate-entity</b> (“how many fruits did she buy at first?”):
                “5” <br></br>4) <b>Locate-entity</b> (“how many fruits did she
                buy before getting to the checkout line?”): 1.
            </p>
            <p>
                <h5>Subquestions</h5> A breakdown of the original question into
                subquestions that are helpful for answering the original
                question. <br></br> <br></br>
                Example) <br></br>
                <b>Q1: How many apples did Amy buy?</b> <br></br>
                <br></br>A: 3.<br></br>
                <br></br> <b>Q2: How many pears did Amy buy?</b> <br></br>
                <br></br>A: 2. <br></br>
                <br></br>
                <b>Q3: Did Amy buy any other fruits?</b> <br></br>
                <br></br>A: No.
            </p>
            <p>
                <h5>Decision Tree</h5>: A breakdown of the original question
                into subquestions presented in a tree structure, with Yes / No
                outcomes for each subquestion. <br></br>
            </p>
        </Alert>
    );
};

const RationaleAnswer = (props) => {
    const [showExample, setShowExample] = useState(false);

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
            <Textbox
                title="Reference Correct Answer"
                text={props.correct_answer}
            />
            <Textbox
                title="Predicted Incorrect Answer"
                text={props.predicted_answer}
            />
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
                    {" "}
                    Now, you will be giving feedback for the rationale. Before
                    you do, however, look at the predicted answer and see if
                    it's actually correct instead of incorrect. We've tried our
                    best, but there may be cases where the AI model has actually
                    output the correct answer. If you think that's the case,
                    mark Yes below and the feedback portion of the study will be
                    skipped.{" "}
                </p>
            </Alert>
            <Likert
                title="Is the predicted answer already correct?"
                options={["Yes", "No"]}
                toChange="predicted_answer_correct"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />

            {props.rationaleAnnotation["predicted_answer_correct"] === "Yes" ? (
                <></>
            ) : (
                <div>
                    <Alert
                        style={{
                            width: "40rem",
                            marginTop: "20px",
                            textAlign: "left",
                        }}>
                        <p>
                            <b>Feedback:</b> Now, you will need to provide
                            natural language feedback for this rationale that
                            will help the AI model revise it. his feedback could
                            target any missing information or any incorrect
                            information in the rationale. The feedback should
                            first 1){" "}
                            <b>
                                localize the step in which the error(s) occur,
                                and describe that error
                            </b>{" "}
                            and 2) <b>provide an actionable suggestion</b>
                            to fix the error.
                        </p>
                        <p>
                            For the above example where: <br></br>
                            <br></br>Context:{" "}
                            <i>
                                Amy went to the supermarket and bought 3 apples
                                and 2 pears. She then looked for some bread and
                                cheese. She could not find bread but found
                                herself some cheese. Just before getting to the
                                checkout line, she bought a watermelon.
                            </i>{" "}
                            <br></br> Question: How many fruits did Amy buy?
                            <br></br> Reference correct answer: 6<br></br>{" "}
                            Predicted answer: 2<br></br> Rationale (Format:
                            Markup and Mask):{" "}
                            <b>Sentence from context with markup:</b> “She{" "}
                            <b>[Amy]</b> then looked for some bread and cheese.”{" "}
                        </p>
                        <p>
                            The feedback could say: <br></br>-
                            <b>Localization and description of error</b>:{" "}
                            <i>
                                In step 1, the rationale does not extract
                                information from the context relevant to
                                answering the question about how many fruits Amy
                                bought.
                            </i>{" "}
                            <br></br>- <b>Actionable suggestion</b>:{" "}
                            <i>
                                The rationale needs to find how many apples,
                                pears and watermelons Amy bought at the
                                supermarket and sum them to find the total
                                number of fruits she bought.
                            </i>
                        </p>
                        <p>
                            **Make sure to not include the correct answer in
                            your feedback explicitly.**
                        </p>
                    </Alert>
                    <Answerbox
                        text="Localization and description of error"
                        state={props.rationaleAnnotation}
                        setState={props.setRationaleAnnotation}
                        toChange="nl_feedback_error"
                    />
                    <Answerbox
                        text="Actionable suggestion"
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
                                How easy did you find providing feedback for
                                this rationale?
                            </b>{" "}
                            <ol type="a">
                                <li>
                                    Very easy: It was straightforward to
                                    identify the issue with the rationale, and
                                    provide an actionable suggestion.
                                </li>
                                <li>
                                    Somewhat easy: It took a bit of effort to
                                    localize / describe the issue or formulate
                                    actionable feedback.
                                </li>
                                <li>
                                    Somewhat hard: It was hard to localize /
                                    describe the issue, or write actionable
                                    feedback.
                                </li>
                                <li>
                                    Very hard: It took a lot of effort to
                                    localize / describe the issue and write
                                    actionable feedback.
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
            )}
        </div>
    );
};

export default RationaleAnswer;
