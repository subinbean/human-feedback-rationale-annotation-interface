import { Alert, Button } from "react-bootstrap";
import { useState } from "react";

const showExampleText = () => {
    return (
        // <Alert
        //     style={{
        //         width: "80%",
        //         marginTop: "20px",
        //         textAlign: "left",
        //     }}>
        <div>
            <div>
                <h4> Example </h4>
                <br></br>
                <p>
                    For <b>example</b>, consider this <b>context</b>:
                </p>
                <p>
                    <i>
                        Amy went to the supermarket and bought 3 apples and 2
                        pears. She then looked for some bread and cheese. She
                        could not find bread but found herself some cheese. Just
                        before getting to the checkout line, she bought a
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
                    as well as generate a <b>rationale</b>, which outlines the
                    process of how the model found that answer. In this study,
                    we will focus on instances where the AI model gave incorrect
                    answers. For example, an AI model might predict an{" "}
                    <b>incorrect answer</b> as <b>2</b>, and a <b>rationale</b>{" "}
                    as: <p></p>
                    <p>
                        {" "}
                        <b>Rationale: </b>
                        <br></br>
                        <b>Quote from context with markup:</b> “She <b>[Amy]</b>{" "}
                        then looked for some bread and cheese.”{" "}
                    </p>
                </p>
                <p>
                    Your task is to label whether the rationale is sufficient on
                    its own to answer the question, as well as whether it is
                    faithful to the information in the context. In the above
                    example, the rationale is <b>entirely insufficient</b>{" "}
                    because it <b>doesn’t</b> contain any information about
                    which fruits Amy bought which means one cannot determine the
                    answer to the question with the rationale alone. On the
                    other hand, the rationale is <b>completely accurate</b> as
                    the information in the rationale is <b>truthful</b> based on
                    the context.
                </p>
                <p>
                    After that, you will be asked to give <b>feedback</b> about
                    the rationale. More on that later in the study.
                </p>
            </div>
            <p>
                {" "}
                That's it for the example! If you wish to hide the example,
                scroll up to the button you clicked before. If you wish to see
                the example again, you can always click the button again to
                "Show Example" :)
            </p>
            <p>
                For the above example where: <br></br>
                <br></br>
                <ul>
                    <li>
                        {" "}
                        Context:{" "}
                        <i>
                            Amy went to the supermarket and bought 3 apples and
                            2 pears. She then looked for some bread and cheese.
                            She could not find bread but found herself some
                            cheese. Just before getting to the checkout line,
                            she bought a watermelon.
                        </i>{" "}
                    </li>
                    <li>Question: How many fruits did Amy buy?</li>
                    <li>
                        Reference correct answer: 6<br></br>
                    </li>
                    <li>
                        Predicted answer: 7<br></br>
                    </li>{" "}
                    <li>
                        Rationale (Format: Annotated Report): <br></br>
                    </li>
                    <ul>
                        <li>
                            <b>1. Quote from context:</b> “bought 3 apples and 2
                            pears” <br></br>
                            <b>Annotation:</b> Amy bought 5 fruits at first.
                        </li>
                        <li>
                            <b>2. Quote from context:</b> “looked for some bread
                            and cheese.” <br></br>
                            <b>Annotation:</b> Amy bought 2 more fruits.
                        </li>
                    </ul>
                </ul>
            </p>{" "}
        </div>
        // </Alert>
    );
};
const ContextQuestion = (props) => {
    const [showExample, setShowExample] = useState(true);

    return (
        <div>
            <Alert
                style={{
                    width: "80%",
                    marginTop: "20px",
                    textAlign: "left",
                }}>
                <p>
                    <h4> Instructions </h4> <br></br>
                    In this task, you will be looking at a context (text
                    snippet), a question answer pair based on the context, and{" "}
                    <b>incorrect answers generated by an AI model</b> to the
                    question. You will be asked to analyze what went wrong, as
                    well as give feedback to the AI model. <br></br>{" "}
                </p>
                <p>
                    <b>All answers are generated based on a rationale</b>, which
                    is essentially a method that the AI model used to get to the
                    answer. You will be presented with{" "}
                    <b>multiple rationale formats</b> along with their
                    corresponding generated answers. We will ask you to evaluate{" "}
                    <b>each rationale format</b>. Specifically, you will be
                    presented with the following input:{" "}
                </p>
                <p>
                    <ul>
                        <li>
                            a snippet of text as the <b>context</b>
                        </li>
                        <li>
                            a <b>question</b> based on this context
                        </li>
                        <li>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <div>
                                    the <b> reference correct answer</b>{" "}
                                </div>
                                <div
                                    style={{
                                        color: "#333333",
                                        marginLeft: "3px",
                                        fontSize: "17px",
                                    }}>
                                    {" "}
                                    *{" "}
                                </div>
                            </div>
                        </li>
                        <li>
                            <b>
                                predicted incorrect answers (corresponding to
                                each rationale){" "}
                            </b>{" "}
                            from the AI model
                        </li>
                        <li>
                            <b>rationales</b> based on the context generated by
                            the model to solve the question
                        </li>
                    </ul>
                </p>
                <p style={{ color: "#333333" }}>
                    <i>
                        * Very rarely, the reference answer might be inaccurate.
                        If so, continue the study with what you think is the
                        correct answer
                    </i>
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
                <p style={{ color: "green" }}>
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
                <p></p>
                <br></br>
                {showExample ? showExampleText() : <></>}
            </Alert>
            {/* {showExample ? showExampleText() : <></>} */}
        </div>
    );
};

export default ContextQuestion;
