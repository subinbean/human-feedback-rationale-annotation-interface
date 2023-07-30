import React from "react";
import { Card } from "react-bootstrap";

const Likert = (props) => {
    const options = [];

    const changeFunction = (event) => {
        const newState = {
            ...props.state,
        };
        newState[props.toChange] = event.target.value;
        props.setState(newState);
    };

    props.options?.map((option) =>
        options.push(
            <div onChange={changeFunction}>
                <form>
                    <input
                        required
                        type="radio"
                        value={option}
                        id={option}
                        name="option"
                        checked={props.state[props.toChange] === option}
                    />
                    <label for={option} style={{ marginLeft: "10px" }}>
                        {" "}
                        {option}{" "}
                    </label>
                    <br></br>
                </form>
            </div>
        )
    );

    return (
        <Card style={{ width: "40rem", marginTop: "20px", textAlign: "left" }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {props.title}
                        <div
                            style={{
                                color: "red",
                                marginLeft: "3px",
                                fontSize: "17px",
                            }}>
                            {" "}
                            *{" "}
                        </div>
                    </div>
                </Card.Title>
                <Card.Text>
                    <form>
                        <fieldset id={props.title}>{options}</fieldset>
                    </form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Likert;
