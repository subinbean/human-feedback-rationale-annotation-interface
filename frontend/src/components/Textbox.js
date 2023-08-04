import React from "react";
import { Card } from "react-bootstrap";

const Textbox = (props) => {
    const displayContext = () => {
        const result = [];
        const parsed = props.text.split("\n");
        for (const i in parsed) {
            result.push(
                <div>
                    <div>
                        <br></br>
                    </div>
                    {parsed[i]}
                </div>
            );
        }
        return result;
    };

    const displayFormatTitle = () => {
        switch (props.format) {
            case "markup_mask":
                return " (Format: Markup and Mask)";
            case "annotated_report":
                return " (Format: Annotated Report)";
            case "procedure":
                return " (Format: Procedural)";
            case "subquestions":
                return " (Format: Subquestions)";
            case "dt":
                return " (Format: Decision Tree)";
            default:
                return "";
        }
    };
    const displayRationale = () => {
        console.log(props.text);
        console.log(props.format);
        switch (props.format) {
            case "markup_mask":
                const m_result = [];
                const regex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
                const m_parsed = props.text.split(regex);
                for (let i = 0; i < m_parsed.length; i++) {
                    m_result.push(
                        <div>
                            <div>
                                <br></br>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        `<b> ${
                                            i + 1
                                        }. Sentence from context: </b>` +
                                        m_parsed[i],
                                }}
                            />
                        </div>
                    );
                }
                return m_result;
            case "annotated_report":
                const result = [];
                const parsed = props.text.split("<b>");
                for (let i = 0; i < parsed.length; i++) {
                    if (parsed[i] === "") {
                        continue;
                    }
                    i % 2 === 0
                        ? result.push(
                              <div>
                                  <div>
                                      <br></br>
                                  </div>
                                  <b> {i / 2 + 1}. Sentence from context: </b>
                                  {parsed[i]}
                              </div>
                          )
                        : result.push(
                              <div>
                                  {" "}
                                  <b> Annotation: </b> {parsed[i]}
                              </div>
                          );
                }
                return result;
            case "procedure":
                const p_result = [];
                const p_parsed = props.text.split("\n");
                for (const i in p_parsed) {
                    p_result.push(
                        <div>
                            <div>
                                <br></br>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: p_parsed[i],
                                }}
                            />
                        </div>
                    );
                }
                return p_result;
            case "subquestions":
                const s_result = [];
                const s_parsed = props.text.split("\n");
                console.log(s_parsed);
                for (const i in s_parsed) {
                    if (s_parsed[i] === "") {
                        continue;
                    }
                    s_result.push(
                        <div>
                            <div>
                                <br></br>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: s_parsed[i],
                                }}
                            />
                        </div>
                    );
                }
                return s_result;
            case "dt":
                return <div dangerouslySetInnerHTML={{ __html: props.text }} />;
            default:
                return <></>;
        }
    };

    return (
        <Card style={{ width: "80%", marginTop: "20px", textAlign: "left" }}>
            <Card.Body>
                <Card.Title> {props.title + displayFormatTitle()} </Card.Title>
                <Card.Text>
                    {props.title === "Rationale"
                        ? displayRationale()
                        : props.title === "Context"
                        ? displayContext()
                        : props.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Textbox;
