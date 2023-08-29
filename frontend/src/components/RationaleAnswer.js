import Textbox from "./Textbox";
import Likert from "./Likert";
import { Alert } from "react-bootstrap";
import "./componentStyle.css";

const showRationaleExamples = (format) => {
    switch (format) {
        case "markup_mask":
            return (
                <p>
                    <h4>Current Rationale Format (Markup and Mask):</h4>{" "}
                    <br></br>A set of extracted sentences from the context which
                    are additionally marked up with what pronouns and ambiguous
                    phrases refer to, in square brackets. <br></br> <br></br>
                    <h5> Example </h5>
                    <b>1. Quote from context: </b>Amy went to the supermarket
                    and bought 3 apples and 2 pears.” <br></br>{" "}
                    <b>2. Quote from context: </b>“Just before getting to the
                    checkout line, she <b>[Amy]</b> picked up a watermelon.”
                </p>
            );
        case "annotated_report":
            return (
                <p>
                    <h4>Annotated Report</h4> <br></br>A list of extracted
                    phrases from the context and what each phrase indicates.{" "}
                    <br></br> <br></br>
                    <h5> Example </h5>
                    <b>1. Quote from context:</b> “bought 3 apples and 2 pears”{" "}
                    <br></br>
                    <b>Annotation:</b> Amy bought 5 fruits at first. <br></br>{" "}
                    <br></br>
                    <b>2. Quote from context:</b> “she picked up a watermelon”{" "}
                    <br></br>
                    <b>Annotation:</b> Amy bought 1 other fruit.
                </p>
            );
        case "procedure":
            return (
                <p>
                    <h4>Procedural:</h4> <br></br>A step-by-step plan of solving
                    the question where each step can be one of the following
                    operations:
                    <ul>
                        <li>
                            Extract-relevant-sentences → extracts sentences from
                            the context relevant to answering the question)
                        </li>
                        <li>
                            Disambiguate-question-entity (s) → determines the
                            specific entity or phrase that the phrase s in the
                            question refers to
                        </li>
                        <li>
                            Disambiguate-plan-entity (s) → determines the
                            specific entity or phrase that the phrase s in the
                            plan so far refers to
                        </li>
                        <li>
                            Locate-entity (s) → Answers a subquestion s that is
                            important to answer the original question
                        </li>
                    </ul>{" "}
                    <h5> Example </h5>
                    1) <b>Extract-relevant-sentences:</b> “Amy went to the
                    supermarket and bought 3 apples and 2 pears.”, “Just before
                    getting to the checkout line, she picked up a watermelon.”{" "}
                    <br></br>
                    2)<b> Disambiguate-plan-entity</b> (“she”): “Amy”. <br></br>{" "}
                    3) <b>Locate-entity</b> (“how many fruits did she buy at
                    first?”): “5” <br></br>4) <b>Locate-entity</b> (“how many
                    fruits did she buy before getting to the checkout line?”):
                    1.
                </p>
            );
        case "subquestions":
            return (
                <p>
                    <h4>Subquestions</h4> <br></br>A breakdown of the original
                    question into subquestions that are helpful for answering
                    the original question. <br></br> <br></br>
                    <h5> Example </h5>
                    <b>Q1: How many apples did Amy buy?</b> <br></br>
                    <br></br>A: 3.<br></br>
                    <br></br> <b>Q2: How many pears did Amy buy?</b> <br></br>
                    <br></br>A: 2. <br></br>
                    <br></br>
                    <b>Q3: Did Amy buy any other fruits?</b> <br></br>
                    <br></br>A: No.
                </p>
            );
        case "dt":
            return (
                <p>
                    <h4>Decision Tree</h4> <br></br>A breakdown of the original
                    question into subquestions presented in a tree structure,
                    with Yes / No outcomes for each subquestion. <br></br>{" "}
                    <br></br>
                    <h5> Example </h5>
                    <ul>
                        <li>
                            <b>Start</b>
                        </li>
                        <li>
                            <b>Q1: Does the text mention Amy buying fruits?</b>
                            <ul>
                                <li>
                                    <b>Yes:</b>
                                    <ul>
                                        <li>
                                            <b>
                                                Q2: Does the text specify the
                                                number of each type of fruit Amy
                                                bought?
                                            </b>
                                            <ul>
                                                <li>
                                                    <b>Yes</b>: 3 apples, 2
                                                    pears, 1 watermelon
                                                    <ul>
                                                        <li>
                                                            <b>Outcome:</b> Amy
                                                            bought a total of 6
                                                            fruits (3 apples + 2
                                                            pears + 1
                                                            watermelon)
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <b>No:</b>
                                                    <ul>
                                                        <li>
                                                            <b>Outcome:</b> The
                                                            text does not
                                                            provide the specific
                                                            numbers of each
                                                            fruit Amy bought.
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <b>No:</b>
                                    <ul>
                                        <li>
                                            <b>Outcome:</b> The text does not
                                            mention Amy buying any fruit.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>End</b>
                        </li>
                    </ul>
                </p>
            );
        default:
            return "";
    }
};

const RationaleAnswer = (props) => {
    return (
        <div>
            <Alert
                style={{
                    width: "80%",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b style={{ color: "green" }}>
                        {" "}
                        **Here is an example explaining the rationale format
                        that you are <i>currently</i> annotating** <br></br>
                    </b>{" "}
                </p>
                <div>{showRationaleExamples(props.rationale_format)}</div>
            </Alert>
            <Textbox title="Context" text={props.context} />
            <Textbox title="Question" text={props.question} />
            <Textbox
                title="Rationale"
                text={props.rationale}
                format={props.rationale_format}
            />
            <Textbox
                title="Generated Correct Answer"
                text={props.predicted_answer}
            />
            <Alert
                style={{
                    width: "80%",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    For a given rationale, the task requires you to answer the
                    following questions:
                </p>
                <p>
                    <b>1. Interpretability:</b> How beneficial is the rationale
                    in helping you understand the reasoning process followed by
                    the AI model to answer the question?
                    <br></br>
                    <br></br>
                    <ol type="a">
                        <li>
                            <b>Very beneficial:</b> The rationale is{" "}
                            <b>extremely helpful</b> in providing a clear and
                            logical description of the model’s reasoning
                            process.
                        </li>
                        <li>
                            <b>A bit beneficial:</b> The rationale is{" "}
                            <b>helpful</b> in understanding the model’s
                            reasoning, but there are{" "}
                            <b>
                                some gaps in the reasoning and some other
                                details are unclear.
                            </b>
                        </li>
                        <li>
                            <b>Not beneficial at all:</b> The rationale{" "}
                            <b>provides little to no benefit</b> in helping me
                            understand how the model came up with the answer.
                        </li>
                    </ol>
                </p>
            </Alert>
            <Likert
                title="Interpertability"
                options={[
                    "Very beneficial",
                    "A bit beneficial",
                    "Not beneficial at all",
                ]}
                toChange="interpretability"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />
            <Alert
                style={{
                    width: "80%",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>2. Trustworthiness:</b> How likely are you to trust the
                    model’s answer, if the rationale was provided along with the
                    answer?
                    <br></br>
                    <br></br>
                    <ol type="a">
                        <li>
                            <b>Very likely:</b> The rationale seems{" "}
                            <b>very trustworthy</b> in supporting how the answer
                            was determined.
                        </li>
                        <li>
                            <b>A bit likely:</b> The rationale provides{" "}
                            <b>some support</b> for the answer, but I cannot
                            completely trust the answer only based on this
                            rationale.
                        </li>
                        <li>
                            <b>A bit unlikely:</b> The rationale provides{" "}
                            <b>very little support</b> for the answer, which
                            makes the answer not easy to trust.
                        </li>
                        <li>
                            <b>Not likely at all:</b> The rationale provides{" "}
                            <b>almost no support</b> for helping me trust the
                            way the answer was determined.
                        </li>
                    </ol>
                </p>
            </Alert>
            <Likert
                title="Trustworthiness"
                options={[
                    "Very likely",
                    "A bit likely",
                    "A bit unlikely",
                    "Not likely at all",
                ]}
                toChange="trustworthiness"
                state={props.rationaleAnnotation}
                setState={props.setRationaleAnnotation}
            />
        </div>
    );
};

export default RationaleAnswer;
