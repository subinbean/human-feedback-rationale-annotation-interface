import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const Slider = (props) => {
    const changeFunction = (e) => {
        const updated = [...props.feedbackValues];
        updated[props.index] = e.target.value;
        props.setFeedbackValues(updated);
    };
    return (
        <div>
            <p>
                {" "}
                <Form.Label style={{ fontSize: "18px" }}>
                    <b>{props.title}</b> {props.content}
                </Form.Label>
                <div style={{ width: "60rem" }}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Not important (1)
                        </Form.Label>
                        <Col sm="8">
                            <RangeSlider
                                min={1}
                                max={5}
                                step={1}
                                value={props.feedbackValues[props.index]}
                                onChange={changeFunction}
                            />
                        </Col>
                        <Form.Label column sm="2">
                            Very important (5)
                        </Form.Label>
                    </Form.Group>
                </div>
            </p>
            <br></br>
        </div>
    );
};

export default Slider;
