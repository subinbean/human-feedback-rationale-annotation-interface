import Textbox from "./Textbox";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";

const showExampleText = () => {
    return (
        <Alert
            style={{
                width: "40rem",
                marginTop: "20px",
                textAlign: "left",
            }}>
            <div>
                <p>
                    For <b>example</b>, consider this <b>context</b>:
                </p>
                <p>
                    <i>
                        Amy went to the supermarket and bought 3 apples and 2
                        pears. She then looked for some bread and cheese. She
                        could not find bread but found herself some cheese. Just
                        before getting to the checkout line, she picked up a
                        watermelon.
                    </i>
                </p>
                <p>
                    A <b>question</b> based on this <b>context</b> might be:{" "}
                    <b>How many fruits did Amy buy?</b>
                </p>
                <p>
                    The <b>reference correct answer</b> to the question will be
                    given to you, which, in this case, is <b>6</b>.
                </p>
                <p>
                    An AI model answering this question will predict an answer
                    as well as a rationale, which is essentially an explanation
                    of how the model found that answer. In this study, we will
                    focus on instances where the AI model gave incorrect
                    answers. For example, an AI model might predict an{" "}
                    <b>incorrect answer</b> as <b>2</b> (which is incorrect),
                    and a <b>rationale</b> as:
                    <ul>
                        <li>
                            {" "}
                            <b>Sentence from context with markup:</b> “She{" "}
                            <b>[Amy]</b> then looked for some bread and cheese.”{" "}
                        </li>
                    </ul>
                </p>
                <p>
                    Your task is to label whether the rationale is sufficient on
                    its own to answer the question, as well as whether it is
                    faithful to the information in the context. In the above
                    example, the rationale is <b>entirely insufficient</b>{" "}
                    because it doesn’t contain any information about which
                    fruits Amy bought which means one cannot determine the
                    answer to the question with the rationale alone. On the
                    other hand, the rationale is <b>completely accurate</b> as
                    the information in the rationale is truthful based on the
                    context.
                </p>
                <p>
                    Next, you will need to provide feedback for this rationale
                    that will help the AI model revise it. The feedback should
                    first 1){" "}
                    <b>
                        localize the step in which the error(s) occur, and
                        describe that error
                    </b>{" "}
                    and 2) <b>provide an actionable suggestion</b>
                    to fix the error.
                </p>
                <p>
                    For the above example, the feedback could say: <br></br>-
                    <b>Localization and description of error</b>:{" "}
                    <i>
                        In step 1, the rationale does not extract information
                        from the context relevant to answering the question
                        about how many fruits Amy bought.
                    </i>{" "}
                    <br></br>- <b>Actionable suggestion</b>:{" "}
                    <i>
                        The rationale needs to find how many apples, pears and
                        watermelons Amy bought at the supermarket and sum them
                        to find the total number of fruits she bought.
                    </i>
                </p>
            </div>
            <p>
                {" "}
                That is it for the example! If you wish to hide the example,
                scroll up to the button you clicked before. If you wish to see
                the example again, you can always click the button to show
                example :)
            </p>
        </Alert>
    );
};
const ContextQuestion = (props) => {
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
                    In this task, you will be looking at a context (text
                    snippet), a question answer pair on the context, and{" "}
                    <b>incorrect answers generated by an AI model</b> to the
                    question. You will be asked to analyze what went wrong, as
                    well as give feedback to the AI model. <br></br>{" "}
                </p>
                <p>
                    <b>All answers are generated based on a rationale</b>, which
                    is essentially a method that the AI model used to get to the
                    answer. We will ask you to <b>evaluate this rationale</b>.
                    Specifically, you will be presented with the following
                    input:{" "}
                </p>
                <p>
                    <ul>
                        <li>
                            a snippet of text from a scientific article as the{" "}
                            <b>context</b>
                        </li>
                        <li>
                            a <b>question</b> based on this context
                        </li>
                        <li>
                            the reference <b>correct answer</b> for the question
                        </li>
                        <li>
                            <b>
                                predicted incorrect answers (corresponding to
                                each rationale){" "}
                            </b>{" "}
                            from the AI model
                        </li>
                        <li>
                            <b>rationales</b> based on the context that is used
                            by the model to solve the question
                        </li>
                    </ul>
                </p>
                <p>
                    A good rationale needs to be 1){" "}
                    <b>
                        {" "}
                        sufficient to answer the question on its own{" "}
                        <i> without </i> the context,
                    </b>{" "}
                    <b> 2) faithful to the information in the context. </b> You
                    will first need to evaluate whether a given rationale
                    satisfies these two criteria. Finally, you will need to
                    provide <b> textual feedback for the rationale. </b>
                </p>
                <p>
                    **
                    <b>
                        Here is an example of what you might see--make sure you
                        read this carefully before starting the task:**
                    </b>
                </p>
                <Button
                    variant="primary"
                    onClick={() => setShowExample(!showExample)}>
                    {showExample ? <b>Hide Example </b> : <b> Show Example</b>}
                </Button>
            </Alert>
            {showExample ? showExampleText() : <></>}
            <Textbox title="Context" text={props.context} />
            <Textbox title="Question" text={props.question} />
        </div>
    );
};

export default ContextQuestion;
