import { useState, useEffect } from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import "./pagesStyle.css";
import ClaimEvidence from "../components/ClaimEvidence";
import { Button, Alert, ProgressBar, Card, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

const AnnotationPage = (props) => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const data = location.state.data;
  // const [seconds, setSeconds] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentClaim, setCurrentClaim] = useState(0);
  // const [revisedClaims, setRevisedClaims] = useState(
  //   data[currentQuestion].claims.map((claim) => claim.claim_string)
  // );
  // const [revisedEvidences, setRevisedEvidences] = useState(
  //   data[currentQuestion].claims.map((claim) => claim.evidence.join("\n\n"))
  // );
  const emptyQuestion = {
    usefulness: "",
    revised_answer: "",
  };
  const emptyClaim = {
    support: "",
    reason_missing_support: "",
    informativeness: "",
    correctness: "",
    reliability: "",
    worthiness: "",
  };
  const [questionAnnotation, setQuestionAnnotation] = useState(emptyQuestion);
  const [claimAnnotation, setClaimAnnotation] = useState(emptyClaim);
  const [missingFields, setMissingFields] = useState([]);

  // useEffect(() => {
  //   setSeconds(new Date());
  // }, []);

  // const buttonInstructions = () => {
  //   if (currentClaim < data[currentQuestion].claims.length - 1) {
  //     return <div> Move onto the next claim below! </div>;
  //   } else if (currentClaim === data[currentQuestion].claims.length - 1) {
  //     return <div> Submit your final claim! </div>;
  //   } else if (currentQuestion < data.length - 1) {
  //     return <div> Move onto the next question! </div>;
  //   } else {
  //     return (
  //       <div>
  //         {" "}
  //         You are now done with all the questions and this task! Press submit
  //         for the completion code.{" "}
  //       </div>
  //     );
  //   }
  // };

  // const buttonText = () => {
  //   if (currentClaim <= data[currentQuestion].claims.length - 1) {
  //     return (
  //       <Button
  //         variant="outline-primary"
  //         style={{ marginLeft: "520px" }}
  //         onClick={buttonAction()}
  //       >
  //         {" "}
  //         Submit claim{" "}
  //       </Button>
  //     );
  //   } else if (currentQuestion < data.length - 1) {
  //     return (
  //       <Button
  //         variant="outline-primary"
  //         style={{ marginLeft: "495px" }}
  //         onClick={buttonAction()}
  //       >
  //         {" "}
  //         Submit question{" "}
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button
  //         variant="outline-primary"
  //         style={{ marginLeft: "390px" }}
  //         onClick={buttonAction()}
  //       >
  //         {" "}
  //         Submit question and finish task{" "}
  //       </Button>
  //     );
  //   }
  // };

  // const buttonAction = () => {
  //   // submit claim
  //   if (currentClaim <= data[currentQuestion].claims.length - 1) {
  //     return () => {
  //       // validation logic
  //       const new_array = [];
  //       const mapping = {
  //         support: "Supported",
  //         reason_missing_support: "Reason for partial support",
  //         informativeness: "Informative",
  //         correctness: "Correctness",
  //         reliability: "Reliability of Source",
  //         worthiness: "Worthiness",
  //       };
  //       for (var field in claimAnnotation) {
  //         if (claimAnnotation[field] === "") {
  //           if (
  //             field === "reason_missing_support" &&
  //             claimAnnotation.support !== "Partial"
  //           ) {
  //             continue;
  //           }
  //           new_array.push(mapping[field]);
  //         }
  //       }
  //       setMissingFields(new_array);
  //       if (new_array.length > 0) {
  //         return () => {};
  //       }
  //       setMissingFields([]);

  //       // console.log(claimAnnotation);

  //       axios.interceptors.request.use((request) => {
  //         //   console.log("Starting Request", JSON.stringify(request, null, 2));
  //         return request;
  //       });

  //       // api call
  //       axios
  //         .patch(
  //           `/api/annotate/question/${data[currentQuestion]._id}/claim/${currentClaim}`,
  //           {
  //             ...claimAnnotation,
  //             revised_claim: revisedClaims[currentClaim],
  //             revised_evidence: revisedEvidences[currentClaim],
  //           }
  //         )
  //         .then((response) => {
  //           // console.log(response);
  //         })
  //         .catch((error) => console.log(error));

  //       // rescroll & state updates
  //       const element = document.getElementById("claim-evidence-section");
  //       element.scrollIntoView({ behavior: "smooth" });
  //       setCurrentClaim(currentClaim + 1);
  //       setClaimAnnotation(emptyClaim);
  //       // console.log(revisedClaims)
  //       // console.log(revisedEvidences)
  //     };
  //   }
  //   // submit question
  //   else {
  //     if (currentQuestion < data.length - 1) {
  //       return () => {
  //         // validation logic
  //         if (questionAnnotation.usefulness === "") {
  //           setMissingFields(missingFields.concat("Usefulness"));
  //           return () => {};
  //         }
  //         if (missingFields.length > 0) {
  //           setMissingFields([]);
  //         }

  //         // console.log(questionAnnotation)

  //         // api call
  //         const revisedAnswer =
  //           questionAnnotation.revised_answer === ""
  //             ? "<Answer>\n\n" +
  //               revisedClaims.join("\n") +
  //               "\n\n<Evidences>\n\n" +
  //               revisedEvidences.join("\n")
  //             : questionAnnotation.revised_answer;
  //         const endTime = new Date();

  //         axios
  //           .patch(`/api/annotate/question/${data[currentQuestion]._id}`, {
  //             completed: true,
  //             usefulness: questionAnnotation.usefulness,
  //             revised_answer: revisedAnswer,
  //             time_spent: endTime - seconds,
  //           })
  //           .then((response) => {
  //             // console.log(response)
  //           })
  //           .catch((error) => console.log(error));

  //         // rescroll & state updates
  //         setSeconds(endTime);
  //         setCurrentClaim(0);
  //         setRevisedClaims(
  //           data[currentQuestion + 1].claims.map((claim) => claim.claim_string)
  //         );
  //         setRevisedEvidences(
  //           data[currentQuestion + 1].claims.map((claim) =>
  //             claim.evidence.join("\n\n")
  //           )
  //         );
  //         setCurrentQuestion(currentQuestion + 1);
  //         window.scrollTo(0, 0);
  //         setQuestionAnnotation(emptyQuestion);
  //       };
  //     }
  //     // submit final question
  //     else {
  //       return () => {
  //         // validation logic
  //         if (questionAnnotation.usefulness === "") {
  //           setMissingFields(missingFields.concat("Usefulness"));
  //           return () => {};
  //         }
  //         if (missingFields.length > 0) {
  //           setMissingFields([]);
  //         }

  //         // api call
  //         const revisedAnswer =
  //           questionAnnotation.revised_answer === ""
  //             ? "<Answer>\n\n" +
  //               revisedClaims.join("\n") +
  //               "\n\n<Evidences>\n\n" +
  //               revisedEvidences.join("\n")
  //             : questionAnnotation.revised_answer;
  //         const endTime = new Date();
  //         // console.log(endTime - seconds)

  //         axios
  //           .patch(`/api/annotate/question/${data[currentQuestion]._id}`, {
  //             completed: true,
  //             usefulness: questionAnnotation.usefulness,
  //             revised_answer: revisedAnswer,
  //             time_spent: endTime - seconds,
  //           })
  //           .then((response) => {
  //             // console.log(response)
  //           })
  //           .catch((error) => console.log(error));

  //         navigate("/submission");
  //       };
  //     }
  //   }
  // };

  // const answerChange = (event) => {
  //   const newState = {
  //     ...questionAnnotation,
  //   };
  //   newState["revised_answer"] = event.target.value;
  //   setQuestionAnnotation(newState);
  // };

  // const renderClaimEvidence = () => {
  //   if (currentClaim < data[currentQuestion].claims.length) {
  //     return (
  //       <div id="claim-evidence-section">
  //         <Alert
  //           style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
  //           <p>
  //             {" "}
  //             3) Following this, you will be asked to annotate the individual
  //             claims contained in the answer. Each claim is a sentence,
  //             accompanied with the evidence for the sentence returned by the
  //             system. The evidence can be presented in the form of 1) URL(s) to
  //             webpages that you may need to open, or 2) URL(s) accompanied with
  //             a relevant passage from each webpage.{" "}
  //           </p>
  //           <p>
  //             {" "}
  //             <b> If you are only given a URL, open the link </b>to answer the
  //             questions.{" "}
  //           </p>
  //           <p>
  //             {" "}
  //             <b> If you are given a passage and a URL</b>, you should judge
  //             support <b> just based on the passage. </b> The URL is provided
  //             simply for more context.{" "}
  //           </p>
  //           <p>
  //             You are on <b> question {currentQuestion + 1}</b>. This question
  //             has <b> {data[currentQuestion].claims.length} claims. </b>
  //           </p>
  //           <p>
  //             Current Claim: {currentClaim + 1} out of{" "}
  //             {data[currentQuestion].claims.length}
  //           </p>
  //           <ProgressBar
  //             variant="primary"
  //             now={
  //               ((currentClaim + 1) * 100.0) /
  //               data[currentQuestion].claims.length
  //             }
  //             style={{ width: "38rem", marginTop: "20px" }}
  //           />
  //         </Alert>
  //         <ClaimEvidence
  //           claim={data[currentQuestion].claims[currentClaim].claim_string}
  //           evidence={data[currentQuestion].claims[currentClaim].evidence}
  //           currentClaim={currentClaim}
  //           revisedClaims={revisedClaims}
  //           setRevisedClaims={setRevisedClaims}
  //           revisedEvidences={revisedEvidences}
  //           setRevisedEvidences={setRevisedEvidences}
  //           claimAnnotation={claimAnnotation}
  //           setClaimAnnotation={setClaimAnnotation}
  //           questionAnnotation={questionAnnotation}
  //           setQuestionAnnotation={setQuestionAnnotation}
  //         />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Alert
  //           style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
  //           <p>
  //             {" "}
  //             5) <b> Answer Revision </b> : Based on the changes to the
  //             individual claims, this is your edited answer. Would you like to
  //             add, edit or delete it any further? Note that we require the
  //             answer to be <b>factual</b>, <b>complete</b> and{" "}
  //             <b> supported by reliable evidence (if it was provided by us).</b>
  //           </p>
  //         </Alert>
  //         <Card
  //           style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
  //           <Card.Body>
  //             <Card.Title>
  //               <div style={{ display: "flex", flexDirection: "row" }}>
  //                 {"Revise answer below:"}
  //                 <div
  //                   style={{
  //                     color: "red",
  //                     marginLeft: "3px",
  //                     fontSize: "17px",
  //                   }}>
  //                   {" "}
  //                   *{" "}
  //                 </div>
  //               </div>
  //             </Card.Title>
  //             <Card.Text>
  //               <Form style={{ marginTop: "21px", width: "400px" }}>
  //                 <Form.Group className="mb-3">
  //                   <Form.Control
  //                     style={{ height: "500px", width: "600px" }}
  //                     as="textarea"
  //                     defaultValue={
  //                       "<Answer>\n\n" +
  //                       revisedClaims.join("\n") +
  //                       "\n\n<Evidences>\n\n" +
  //                       revisedEvidences.join("\n\n")
  //                     }
  //                     onChange={answerChange}
  //                   />
  //                 </Form.Group>
  //               </Form>
  //             </Card.Text>
  //           </Card.Body>
  //         </Card>
  //       </div>
  //     );
  //   }
  // };

  const renderAlert = () => {
    if (missingFields.length > 0) {
      return (
        <Alert
          variant="danger"
          style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
          {" "}
          Please submit the following required fields before submitting:{" "}
          {missingFields.join(", ")}{" "}
        </Alert>
      );
    }
  };

  return (
    <div align="center">
      <Alert style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
        <p>
          {" "}
          <h3> Expert Evaluation of AI Answers: Stage 2 </h3>
        </p>
        <p>
          This task has <b> {1} questions. </b>
        </p>
        Current Question: {currentQuestion + 1} out of {1}
        <ProgressBar
          variant="primary"
          now={((currentQuestion + 1) * 100.0) / 1}
          style={{ width: "38rem", marginTop: "20px", marginBottom: "20px" }}
        />
        <p>
          {" "}
          Make sure to <b> follow the instructions carefully </b> and submit all
          the questions! If an <b>error</b> occurs in the interface, just click
          on the link again and provide your ID.{" "}
        </p>
      </Alert>
      <QuestionAnswer
        question={"hey"}
        answer={"hey"}
        questionAnnotation={questionAnnotation}
        setQuestionAnnotation={setQuestionAnnotation}
      />
      {/* {renderClaimEvidence()} */}
      {/* <Alert style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
        {buttonInstructions()}
      </Alert> */}
      {renderAlert()}
      {/* <div className="buttons">{buttonText()}</div> */}
    </div>
  );
};

export default AnnotationPage;
