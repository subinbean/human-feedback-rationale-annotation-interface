import Textbox from "./Textbox";
import { Alert } from "react-bootstrap";

const ContextQuestion = (props) => {
  return (
    <div>
      <Alert style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
        <p>
          In this task, you will be presented with the following input:
          <ul>
            <li>
              a snippet of text from a scientific article as the <b>context</b>
            </li>
            <li>
              a <b>question</b> based on this context
            </li>
            <li>
              a <b>rationale</b> based on the context that presents a method to
              solve the question
            </li>
            <li>
              the reference <b>correct answer</b> for the question
            </li>
            <li>
              the <b>predicted answer</b> from the AI model.
            </li>
          </ul>
        </p>
      </Alert>
      <Textbox title="Context" text={props.context} />
      <Textbox title="Question" text={props.question} />
    </div>
  );
};

export default ContextQuestion;
