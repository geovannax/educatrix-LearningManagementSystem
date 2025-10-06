import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

import AppNavbar from "../components/layout/AppNavbar";

function Home() {
  return (
    <div className="min-vh-100">
      <AppNavbar />

      <div className="container-fluid bg-gray-light">
        <Container>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={6}>
              <div className="pe-lg-5">
                <h1 className="display-4 fw-bold mb-4 text-dark-custom">
                  Avaliando a<br />
                  Aprendizagem de
                  <br />
                  Forma{" "}
                  <span className="text-educatrix-green">Inteligente</span>
                </h1>
                <p
                  className="lead text-muted mb-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  Relatórios e análises que mostram, passo a passo,
                  <br />
                  como o conhecimento foi construído.
                </p>
                <Button
                  variant="success"
                  size="lg"
                  className="rounded-pill px-4 py-3 fw-semibold shadow"
                >
                  Criar turma
                </Button>
              </div>
            </Col>
            <Col lg={6}>{/* Sua ilustração aqui */}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
