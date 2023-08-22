import React from "react";
import { Card, Form } from "react-bootstrap";

const Answerbox = (props) => {
    const changeFunction = (event) => {
        const newState = {
            ...props.state,
        };
        newState[props.toChange] = event.target.value;
        props.setState(newState);
    };
    const redDot = () => {
        return (
            <div style={{ color: "red", marginLeft: "3px", fontSize: "17px" }}>
                {" "}
                *{" "}
            </div>
        );
    };
    return (
        <Card style={{ width: "80%", marginTop: "20px", textAlign: "left" }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {props.text + ":"}
                        {redDot()}
                    </div>
                </Card.Title>
                <Card.Text>
                    <Form style={{ marginTop: "21px", width: "80%" }}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                style={{
                                    width:
                                        props.toChange === "location" ||
                                        props.toChange === "type"
                                            ? "50%"
                                            : "80%",
                                    height:
                                        props.toChange === "location" ||
                                        props.toChange === "type"
                                            ? "2rem"
                                            : "5rem",
                                }}
                                value={props.state[props.toChange]}
                                onChange={changeFunction}
                            />
                        </Form.Group>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Answerbox;
