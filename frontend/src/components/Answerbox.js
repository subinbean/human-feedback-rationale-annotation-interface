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
        <Card style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {props.text + ":"}
                        {redDot()}
                    </div>
                </Card.Title>
                <Card.Text>
                    <Form style={{ marginTop: "21px", width: "40rem" }}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                style={{ width: "35rem", height: "200px" }}
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
