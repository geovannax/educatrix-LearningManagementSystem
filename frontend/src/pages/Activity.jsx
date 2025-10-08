import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import AppNavbar from "../components/layout/AppNavbar";
import { useActivities } from "../hooks/useActivities";
import { useToast } from "../contexts/ToastContext";

const activitySchema = z.object({
  activityTitle: z.string().min(3, "Nome da atividade é obrigatório"),
  activityType: z
    .string()
    .refine((value) => ["codigo", "discursiva", "objetiva"].includes(value), {
      message: "Selecione um tipo de atividade válido",
    }),
  activityDescription: z
    .string()
    .min(
      10,
      "Descrição da atividade é obrigatória e deve ter ao menos 10 caracteres"
    ),
  habilitarChatInterativo: z.boolean(),
});

function Activity() {
  // Estado para controlar qual view mostrar
  const [activeTab, setActiveTab] = useState("lista");
  const [editingActivity, setEditingActivity] = useState(null);
  const { addToast } = useToast();

  // Usar o hook useActivities
  const {
    activities,
    isLoadingActivity,
    errorActivity,
    createActivity,
    deleteActivity,
    updateActivity,
    clearError,
  } = useActivities();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      nomeDaAtividade: "",
      descricaoDaAtividade: "",
      habilitarChatInterativo: false,
    },
  });

  const onSubmit = async (data) => {
    // Cria instância da nova atividade
    const activityData = {
      title: data.activityTitle,
      type: data.activityType,
      description: data.activityDescription,
    };

    let result;

    if (editingActivity) {
      // Modo edição - chama updateActivity
      result = await updateActivity(editingActivity.id, activityData);
    } else {
      // Modo criação - chama createActivity
      result = await createActivity(activityData);
    }

    if (result.success) {
      reset();
      setEditingActivity(null);
      addToast(
        "Sucesso",
        editingActivity
          ? "Atividade atualizada com sucesso!"
          : "Atividade cadastrada com sucesso!"
      );
      setActiveTab("lista");
    }
  };

  const onUpdate = async (activityId) => {
    // Encontrar a atividade na lista pelo ID
    const activity = activities.find((a) => a.id === activityId);

    if (activity) {
      // Preencher o formulário com os dados da atividade
      setValue("activityTitle", activity.title);
      setValue("activityType", activity.type);
      setValue("activityDescription", activity.description);
      // Mudar o estado para edição
      setEditingActivity(activity);
      // Mudar para a aba de cadastro
      setActiveTab("cadastro");
    } else {
      addToast("Erro", "Atividade não encontrada!", "danger");
    }
  };

  // Função para cancelar a edição
  const cancelUpdate = () => {
    setEditingActivity(null);
    reset();
    setActiveTab("lista");
  };

  const onDelete = async (id) => {
    const result = await deleteActivity(id);

    if (result.success) {
      reset();
      addToast("Sucesso", "Atividade deletada com sucesso!");
    }
  };

  return (
    <div className="min-vh-100 bg-gray-light">
      <AppNavbar />

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={activeTab === "lista" ? 10 : 8}>
            {activeTab === "lista" ? (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0 text-dark-custom">
                      Minhas Atividades
                    </h2>
                    <Button
                      variant="success"
                      className="rounded-pill px-4"
                      onClick={() => {
                        setActiveTab("cadastro");
                        clearError();
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Nova Atividade
                    </Button>
                  </div>

                  {activities.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-list-task display-1 text-muted mb-3"></i>
                      <h5 className="text-muted">
                        Nenhuma atividade encontrada
                      </h5>
                      <p className="text-muted">
                        Clique em "Nova Atividade" para começar
                      </p>
                    </div>
                  ) : (
                    <Table responsive hover>
                      <thead className="bg-light">
                        <tr>
                          <th>Nome</th>
                          <th>Tipo</th>
                          <th>Descrição</th>
                          <th>Criado em</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((atividade) => (
                          <tr key={atividade.id}>
                            <td className="fw-semibold">{atividade.title}</td>
                            <td className="fw-semibold">{atividade.type}</td>
                            <td
                              className="text-muted"
                              style={{ maxWidth: "200px" }}
                            >
                              {atividade.description.length > 50
                                ? `${atividade.description.substring(0, 50)}...`
                                : atividade.description}
                            </td>

                            <td className="text-muted">
                              {new Date(atividade.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => onUpdate(atividade.id)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(atividade.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-5">
                  <div className="d-flex align-items-center mb-4">
                    <Button
                      variant="link"
                      className="text-decoration-none p-0 me-3"
                      onClick={() => {
                        setActiveTab("lista");
                        cancelUpdate();
                      }}
                    >
                      <i className="bi bi-arrow-left fs-5"></i>
                    </Button>
                    <h2 className="fw-bold mb-0 text-dark-custom">
                      Cadastro de Atividade
                    </h2>
                  </div>

                  {errorActivity && (
                    <Alert
                      variant="danger"
                      className="text-center"
                      dismissible
                      onClose={clearError}
                    >
                      {typeof errorActivity === "string" ? (
                        errorActivity
                      ) : Array.isArray(errorActivity) ? (
                        <ul className="mb-0 text-start">
                          {errorActivity.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      ) : (
                        "Erro desconhecido"
                      )}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Nome da Atividade:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Exemplo de preenchido"
                        {...register("activityTitle")}
                        isInvalid={!!errors.activityTitle}
                        className="py-3"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.activityTitle?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Tipo de Atividade:
                      </Form.Label>
                      <Form.Select
                        {...register("activityType")}
                        className="py-3"
                        isInvalid={!!errors.activityType}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione um tipo
                        </option>{" "}
                        <option value="codigo">Código</option>
                        <option value="discursiva">Discursiva</option>
                        <option value="objetiva">Objetiva</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.activityType?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Descrição da Atividade:
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Exemplo de preenchido descritivo"
                        {...register("activityDescription")}
                        isInvalid={!!errors.activityDescription}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.activityDescription?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button
                        variant="success"
                        type="submit"
                        size="lg"
                        className="py-3 fw-semibold rounded-pill"
                        disabled={isLoadingActivity}
                      >
                        {isLoadingActivity ? (
                          <>
                            <div
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            {editingActivity
                              ? "Atualizando..."
                              : "Cadastrando..."}
                          </>
                        ) : (
                          <>
                            <i
                              className={`bi ${
                                editingActivity
                                  ? "bi-check-circle"
                                  : "bi-plus-circle"
                              } me-2`}
                            ></i>
                            {editingActivity
                              ? "Atualizar Atividade"
                              : "Cadastrar Atividade"}
                          </>
                        )}
                      </Button>

                      {editingActivity && (
                        <Button
                          variant="danger"
                          size="lg"
                          className="py-3 fw-semibold rounded-pill mb-2"
                          onClick={cancelUpdate}
                          disabled={isLoadingActivity}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Activity;
