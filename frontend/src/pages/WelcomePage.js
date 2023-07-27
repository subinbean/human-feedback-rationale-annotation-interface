import { useState } from "react";
import "./pagesStyle.css";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [prolificId, setProlificId] = useState("");
  const [alert, setAlert] = useState(false);
  const baseUrl = `/api/questions/${prolificId}`;

  const onClick = (e) => {
    e.preventDefault();
    axios
      .get(baseUrl)
      .then((response) => {
        if (response.data.length === 0) {
          setAlert(true);
        } else {
          const todoQuestions = response.data.filter(
            (question) => !question.completed
          );
          console.log(todoQuestions);
          if (todoQuestions.length === 0) {
            navigate("/submission");
          } else {
            navigate("/questions", { state: { data: todoQuestions } });
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const renderAlert = () => {
    if (alert) {
      return (
        <Alert
          variant="danger"
          style={{ width: "50rem", marginTop: "20px", textAlign: "left" }}>
          {" "}
          No questions match the provided ID in the database{" "}
        </Alert>
      );
    }
  };

  return (
    <div className="welcome">
      <Card style={{ width: "40rem", height: "30rem", marginTop: "12rem" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginTop: "1rem" }}>
            {" "}
            <b> User Study - Providing Feedback for AI Outputs </b>{" "}
          </Card.Title>
          <Card.Text
            style={{
              textAlign: "left",
              lineHeight: "1.7",
              marginTop: "2rem",
            }}>
            <p>
              {" "}
              Thank you for your interest in our task! We are a group of
              researchers at the University of Pennsylvania conducting a study
              to understand how to present answers from AI systems / language
              models, such that they are interpretable, easy to provide human
              feedback to and trustworthy for end users. We are inviting
              participants who [are experts in the medicine / healthcare fields
              and] are interested in helping build more reliable AI systems that
              can improve through their interactions with users.{" "}
            </p>
            <p style={{ marginTop: "4rem" }}>
              Please enter your prolific ID down below to begin the task:
              <Form
                style={{ marginTop: "10px", width: "400px" }}
                onSubmit={onClick}>
                <Form.Group className="mb-3">
                  <Form.Control
                    placeholder="Enter Prolific ID"
                    onChange={(text) => setProlificId(text.target.value)}
                  />
                </Form.Group>
              </Form>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      {renderAlert()}
      <Button
        variant="outline-primary"
        onClick={onClick}
        style={{ marginTop: "20px" }}>
        {" "}
        Submit and start task{" "}
      </Button>
    </div>
  );
};

export default WelcomePage;
