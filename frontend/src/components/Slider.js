import React from "react";
import { Form } from "react-bootstrap";
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
            {" "}
            <Form.Label>
                <b>{props.title}</b>
            </Form.Label>
            <div style={{ width: "30rem" }}>
                <RangeSlider
                    min={1}
                    max={5}
                    step={1}
                    value={props.feedbackValues[props.index]}
                    onChange={changeFunction}
                />
            </div>
        </div>
    );
};

export default Slider;
