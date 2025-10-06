import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { login, authInfo, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Se já tiver logado redireciona para /home
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Chama a api de auth no submit
  const onSubmit = async (data) => {
    await login(data);
  };

  // Função para mostrar/ocultar senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      className="p-4 p-lg-5 shadow-sm"
      style={{ maxWidth: "400px", margin: "50px auto" }}
    >
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="me-2" style={{ width: "50px", height: "50px" }}>
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center h-100">
              <span className="text-white fw-bold fs-4">E</span>
            </div>
          </div>
          <span className="fw-bold fs-3 text-educatrix-blue">
            <span className="text-educatrix-green">EDUCA</span>TRIX
          </span>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Input Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-envelope"></i>
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              isInvalid={!!errors.email}
              className="py-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Input Senha com Show/Hide */}
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock"></i>
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password")}
              isInvalid={!!errors.password}
              className="py-3"
            />
            {/* Botão para mostrar/ocultar senha */}
            <Button
              variant="outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
              className="border border-start-0  rounded-end-1 "
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Mensagem de Erro */}
        {authInfo?.error && (
          <div className="text-danger text-center mb-3">{authInfo.error}</div>
        )}

        {/* Botão de Submit */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 py-3 mt-3"
          disabled={authInfo?.isLoading}
        >
          {authInfo?.isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Entrando...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Entrar
            </>
          )}
        </Button>

        {/* Dados de Teste */}
        <div className="mt-4 p-3 bg-light rounded">
          <small className="text-muted">
            <strong>Teste:</strong>
            <br />
            Email: prof@educatrix.dev
            <br />
            Senha: 123456
          </small>
        </div>
      </Form>
    </Card>
  );
}

export default Login;
