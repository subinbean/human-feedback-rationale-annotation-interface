import Textbox from "./Textbox";
import Likert from "./Likert";
import Answerbox from "./Answerbox";
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
                title="Reference Correct Answer"
                text={props.correct_answer}
            />
            <Textbox
                title="Generated Incorrect Answer"
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
                    <b>Sufficiency</b>: Is the rationale sufficient to answer
                    the question? <br></br> The given rationale{" "}
                    <b>
                        should contain enough information to answer the question
                        using the rationale alone, without using the context.
                    </b>{" "}
                    Note that the rationale may contain inaccuracies in
                    information but could still contain sufficient information
                    to determine an answer.
                    <ol type="a">
                        <li>
                            {" "}
                            <b>Sufficient:</b> The Rationale is{" "}
                            <b> entirely sufficient </b> to answer the question.
                        </li>
                        <li>
                            <b>A bit insufficient:</b> The Rationale contains
                            most of the information, but{" "}
                            <b>misses minor information</b> that could be useful
                            to answer the question.{" "}
                        </li>
                        <li>
                            <b>Entirely insufficient:</b> The Rationale{" "}
                            <b>misses key information</b> from the context,
                            required to answer the question.
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
                    width: "80%",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <b>Faithfulness to context:</b> Does the information in the
                    rationale accurately represent information in the context?{" "}
                    <br></br>The given rationale should be faithful to the
                    context, that is, it{" "}
                    <b>
                        should accurately draw conclusions from the context
                        without misrepresenting any information.
                    </b>{" "}
                    Note that we are only judging whether the rationale is
                    faithful to the context, so not all information sufficient
                    to answer the question needs to be present in the rationale
                    for it to be accurate.
                    <ol type="a">
                        <li>
                            {" "}
                            <b>Accurate:</b> The Rationale is{" "}
                            <b>completely faithful</b> to the context.
                        </li>
                        <li>
                            <b>A bit inaccurate:</b> The Rationale{" "}
                            <b>
                                misrepresents minor information or makes minor
                                incorrect conclusions
                            </b>{" "}
                            from the context.
                        </li>
                        <li>
                            <b>Very inaccurate:</b> The Rationale{" "}
                            <b>
                                misrepresents significant information or draws
                                incorrect conclusions
                            </b>{" "}
                            from the context.
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
            <div>
                <Alert
                    style={{
                        width: "80%",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    <p>
                        <h4> Feedback Instructions </h4> <br></br>
                        <b>Feedback:</b> Now, you will need to provide feedback
                        for the rationale. Imagine you are giving feedback to a
                        student who is learning how to improve their reading
                        comprehension. Your feedback should aim to give the{" "}
                        <b>
                            most useful statement(s) that would direct the
                            student to the reference correct answer above.
                        </b>{" "}
                        The feedback could target missing information or
                        incorrect information in the rationale that caused the
                        model to predict the incorrect answer. The feedback
                        needs to be given in the following way:
                    </p>
                </Alert>
                <Alert
                    style={{
                        width: "80%",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    {" "}
                    <p>
                        <b>1. Locate the error </b> by listing the step(s) (or
                        question number depending on the rationale format) in
                        which the error(s) occurs in the following manner:
                        <ul>
                            <li>
                                {" "}
                                <b>Markup and Mask:</b> Step X (e.g Step 1, Step
                                2)
                            </li>
                            <li>
                                {" "}
                                <b>Annotated Report:</b> Step X (e.g Step 1,
                                Step 2){" "}
                            </li>
                            <li>
                                {" "}
                                <b>Procedural:</b> Step X (e.g Step 1, Step 2){" "}
                            </li>
                            <li>
                                {" "}
                                <b>Subquestions:</b> QX (e.g Q1, Q2){" "}
                            </li>
                            <li>
                                {" "}
                                <b>Decision Tree:</b> QX-Yes/No (e.g Q1-Yes)
                            </li>
                        </ul>
                        Note: You <b>only</b> need to mention the location here
                    </p>
                </Alert>
                <Answerbox
                    text="Location of Error"
                    state={props.feedbackAnnotation}
                    setState={props.setFeedbackAnnotation}
                    toChange="location"
                />
                <Alert
                    style={{
                        width: "80%",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    <p>
                        <b>2. Identify type of error:</b> Mention the type of
                        the error you recognized. Note that issues in rationales
                        can be of various kinds:
                        <ul>
                            <li>insufficient information</li>
                            <li>irrelevant information</li>
                            <li>incorrect inferences drawn from the context</li>
                            <li>misinterpretation of the context </li>
                            <li>any other error beyond these. </li>
                        </ul>
                    </p>
                    <p>
                        The <b>good</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>{" "}
                        <ul>
                            <li>
                                {" "}
                                The information is not relevant to answering the
                                question and the inference drawn from the
                                context is incorrect.
                            </li>
                        </ul>
                        The <b>bad</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>
                        <ul>
                            <li>The rationale is bad.</li>
                        </ul>
                    </p>
                </Alert>
                <Answerbox
                    text="Type of Error"
                    state={props.feedbackAnnotation}
                    setState={props.setFeedbackAnnotation}
                    toChange="type"
                />
                <Alert
                    style={{
                        width: "80%",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    <p>
                        <b>3. Describe the error:</b> Using{" "}
                        <b>concrete details</b> from the rationale, question,
                        and context, provide a clear description of the error.
                        <br></br> <br></br>Remember:
                        <ul>
                            <li>
                                {" "}
                                <b>
                                    Make sure to not include the correct answer
                                    anywhere
                                </b>{" "}
                                in your feedback explicitly.{" "}
                            </li>
                            <li>
                                {" "}
                                <b>
                                    Try not to only repeat what is already
                                    stated in the question or rationale.
                                </b>{" "}
                                Instead,{" "}
                                <b>
                                    include some supplemental information based
                                    on the context{" "}
                                </b>
                                that would guide the model towards the correct
                                answer.
                            </li>
                        </ul>
                    </p>
                    <p>
                        The <b>good</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>{" "}
                        <ul>
                            <li>
                                {" "}
                                Bread and cheese are not fruits, and the
                                question asks about the number of fruits Amy
                                bought
                            </li>
                        </ul>
                        The <b>bad</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>
                        <ul>
                            <li>
                                It is not relevant --{" "}
                                <i>
                                    This statement doesn’t really describe the
                                    error using any concrete details.
                                </i>
                            </li>
                        </ul>
                    </p>
                </Alert>
                <Answerbox
                    text="Description of Error"
                    state={props.feedbackAnnotation}
                    setState={props.setFeedbackAnnotation}
                    toChange="description"
                />
                <Alert
                    style={{
                        width: "80%",
                        marginTop: "20px",
                        textAlign: "left",
                    }}>
                    <p>
                        <b>
                            4. Provide an actionable suggestion to fix the
                            error:
                        </b>{" "}
                        Using <b>concrete details</b> from the rationale,
                        question and context, provide an <b>actionable edit</b>{" "}
                        that would fix the rationale and cause the model to
                        predict the correct answer. <br></br>
                        <br></br> Remember:
                        <ul>
                            <li>
                                {" "}
                                <b>Follow this format:</b> The rationale needs
                                to [suggestion].
                            </li>
                            <li>
                                {" "}
                                <b>
                                    Make sure to not include the correct answer
                                    anywhere
                                </b>{" "}
                                in your feedback explicitly.{" "}
                            </li>
                            <li>
                                {" "}
                                <b>
                                    Try not to only repeat what is already
                                    stated in the question or rationale.
                                </b>{" "}
                                Instead,{" "}
                                <b>
                                    include some supplemental information based
                                    on the context{" "}
                                </b>
                                that would guide the model towards the correct
                                answer.
                            </li>
                        </ul>
                    </p>
                    <p>
                        The <b>good</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>{" "}
                        <ul>
                            <li>
                                The rationale needs to find how many watermelons
                                Amy picked up just before getting to the
                                checkout line and then sum the count of all
                                fruits to find the total number of fruits she
                                bought.
                            </li>
                        </ul>
                        The <b>bad</b> feedback for the <i>Amy buys fruits</i>{" "}
                        example could be: <br></br>
                        <ul>
                            <li>
                                The rationale needs to find the total number of
                                fruits that Amy bought --{" "}
                                <i>this merely repeats the original question</i>
                                .
                            </li>
                        </ul>
                    </p>
                </Alert>
                <Answerbox
                    text="Actionable suggestion"
                    state={props.rationaleAnnotation}
                    setState={props.setRationaleAnnotation}
                    toChange="nl_feedback_fix"
                />
                <Alert
                    style={{
                        width: "80%",
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
                                <b>Very easy</b>: It was <b>straightforward</b>{" "}
                                to locate / describe the error and provide an
                                actionable suggestion.
                            </li>
                            <li>
                                <b>Somewhat easy</b>: It{" "}
                                <b>took a bit of effort</b> to locate / describe
                                the error or provide an actionable suggestion.
                            </li>
                            <li>
                                <b>Somewhat hard</b>: It was <b>hard to</b>{" "}
                                locate / describe the error or provide an
                                actionable suggestion.
                            </li>
                            <li>
                                <b>Very hard</b>: It <b>took a lot of effort</b>{" "}
                                to locate / describe the error and provide an
                                actionable suggestion.
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
        </div>
    );
};

export default RationaleAnswer;
