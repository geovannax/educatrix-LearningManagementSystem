import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../contexts/ToastContext";

export function useAuth() {
  const [authInfo, setAuthInfo] = useState({
    isLoading: false,
    success: null,
    error: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const login = async (credentials) => {
    setAuthInfo({ ...authInfo, isLoading: true });

    try {
      const response = await api.post("/auth/login", credentials);

      // Salva token Não seguro
      if (response.data.data) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("userRole", response.data.data.role);
        localStorage.setItem("userName", response.data.data.name);

        setAuthInfo({
          isLoading: false,
          success: true,
          error: null,
        });

        addToast("Sucesso", `Bem vindo ${response.data.data.name}`, "info");

        // Redireciona para a página que o usuário tentou acessar ou home
        const redirectTo = location.state?.from?.pathname || "/home";
        navigate(redirectTo);
      }
    } catch (error) {
      let message = "Erro inesperado";
      if (error.response?.data?.details) {
        message = error.response.data.details;
      } else if (error.request) {
        message = "Erro de conexão. Verifique sua internet.";
      }
      setAuthInfo({
        isLoading: false,
        success: false,
        error: message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setAuthInfo({
      isLoading: false,
      success: null,
      error: null,
    });
    addToast("Sucesso", "Deslogado com sucesso!", "info");
    navigate("/home");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const isTeacher = () => {
    return localStorage.getItem("userRole") === "professor";
  };

  return {
    login,
    logout,
    isAuthenticated,
    isTeacher,
    authInfo,
  };
}
