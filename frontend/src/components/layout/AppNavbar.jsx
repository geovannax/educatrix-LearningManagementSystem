import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AppNavbar() {
  const { isAuthenticated, isTeacher, logout } = useAuth();
  const navigate = useNavigate();

  // Função para extrair primeiro e último nome
  const getDisplayName = () => {
    const fullName = localStorage.getItem("userName");
    if (!fullName) return "";

    const names = fullName.trim().split(" ");

    // Se só tem um nome, retorna ele
    if (names.length === 1) return names[0];

    // Se tem dois ou mais nomes, retorna primeiro + último
    if (names.length >= 2) {
      return `${names[0]} ${names[names.length - 1]}`;
    }

    return fullName;
  };

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        {/* Logo/Brand */}
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div className="me-2" style={{ width: "40px", height: "40px" }}>
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center h-100">
              <span className="text-white fw-bold">E</span>
            </div>
          </div>
          <span className="fw-bold text-educatrix-blue">
            <span className="text-educatrix-green">EDUCA</span>TRIX
          </span>
        </Navbar.Brand>

        {/* Toggle para mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu Principal */}
          <Nav className="mx-auto">
            <Nav.Link className="text-dark me-4" onClick={() => navigate("/")}>
              <i className="bi bi-house-door me-1"></i>
              Home
            </Nav.Link>

            <Nav.Link href="#professores" className="text-dark me-4">
              Professores
            </Nav.Link>

            <Nav.Link href="#alunos" className="text-dark me-4">
              Alunos
            </Nav.Link>

            {/* Dropdown Turmas (apenas se autenticado e professor) */}
            {isAuthenticated() && isTeacher() && (
              <Dropdown as={Nav.Item} className="text-dark me-4">
                <Dropdown.Toggle as={Nav.Link}>Turmas</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#turma-a">Turma A</Dropdown.Item>
                  <Dropdown.Item href="#turma-b">Turma B</Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item onClick={() => navigate("/cadastro-turmas")}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Nova Turma
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {/* Menu Atividades (apenas se autenticado) */}
            {isAuthenticated() && (
              <Nav.Link href="/Activity" className="text-dark me-4">
                Atividades
              </Nav.Link>
            )}
          </Nav>

          {isAuthenticated() ? (
            /* Dropdown de Perfil */
            <Dropdown align="end">
              <Dropdown.Toggle
                as={Button}
                variant="success"
                className="rounded-pill px-3 py-2 d-flex align-items-center border-0 remove-dropdown-toggle"
                id="profile-dropdown"
              >
                <div
                  className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2"
                  style={{ width: "32px", height: "32px" }}
                >
                  <i className="bi bi-person-fill text-success"></i>
                </div>
                <div className="me-2 d-none d-lg-inline">
                  {getDisplayName()}
                </div>

                <i className="bi bi-chevron-down"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow border-0 mt-2"
                style={{ minWidth: "200px" }}
              >
                <Dropdown.Item
                  href="#perfil"
                  className="d-flex align-items-center py-2"
                >
                  <i className="bi bi-person me-3"></i>
                  Perfil
                </Dropdown.Item>

                {isTeacher() && (
                  <Dropdown.Item
                    href="#minhas-turmas"
                    className="d-flex align-items-center py-2"
                  >
                    <i className="bi bi-people me-3"></i>
                    Minhas Turmas
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  onClick={() => navigate("/Activity")}
                  className="d-flex align-items-center py-2"
                >
                  <i className="bi bi-list-task me-3"></i>
                  Minhas Atividades
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                  onClick={logout}
                  className="d-flex align-items-center py-2 text-danger"
                >
                  <i className="bi bi-box-arrow-right me-3"></i>
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant="success"
              className="rounded-pill px-4 fw-semibold d-flex align-items-center"
              onClick={() => navigate("/login")}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Entrar
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
