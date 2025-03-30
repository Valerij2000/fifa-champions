import React from "react";
import "./App.css";
import ChampionForm from "./components/ChampionForm";
import CurrentChampion from "./components/CurrentChampion";
import PreviousChampions from "./components/PreviousChampions";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid className="app">
      <Row className="w-100">
        <Col lg={6} className="mb-4">
          <div className="form-container">
            <h2 className="mb-4">Add New Champion</h2>
            <ChampionForm />
          </div>
        </Col>
        <Col lg={6}>
          <div className="champion-container">
            <CurrentChampion />
            <PreviousChampions />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
