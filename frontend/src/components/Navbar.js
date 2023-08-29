import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../upenn.png";

const navbar = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={logo}
                            width="50"
                            height="30"
                            alt="UPenn logo"
                            style={{ marginLeft: "-3rem" }}
                        />
                        <div style={{ marginLeft: "-2px" }}>
                            {" "}
                            Evaluating Rationales from AI Models{" "}
                        </div>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default navbar;
