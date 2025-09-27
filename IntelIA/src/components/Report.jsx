import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Navbar,
  Nav,
  Spinner,
} from "react-bootstrap";
import "./Report.css";

const API_URL = "http://localhost:8000"; // Ajusta esto a tu backend real

const Report = ({ structuredData }) => {
  const [conditions, setConditions] = useState([]);
  const [diagnosisText, setDiagnosisText] = useState("");
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false);

  // 🧠 1️⃣ Fetch probabilidades
  useEffect(() => {
    const fetchProbabilities = async () => {
      if (!structuredData) return;

      try {
        const res = await fetch(`${API_URL}/predict-probabilities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptoms: structuredData.sintomas_asociados }),
        });

        const data = await res.json();

        const mapped = data.top_predictions.map((item) => ({
          icon: "💊",
          label: item.disease,
          probability: Math.round(item.probability * 100),
        }));

        setConditions(mapped);
      } catch (error) {
        console.error("Error obteniendo probabilidades:", error);
      }
    };

    fetchProbabilities();
  }, [structuredData]);

  // 🧠 2️⃣ Fetch diagnóstico generado por HuggingFace
  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (!structuredData || !structuredData.sintomas_asociados?.length) return;

      setLoadingDiagnosis(true);
      setDiagnosisText("");

      try {
        // Construir prompt automáticamente
        const prompt = `The patient reports the following symptoms: ${structuredData.sintomas_asociados.join(
          ", "
        )}. Provide a brief possible diagnosis and reasoning.`;

        const res = await fetch(`${API_URL}/generate-diagnosis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        setDiagnosisText(data.diagnosis_text || "No diagnosis generated.");
      } catch (error) {
        console.error("Error generando diagnóstico:", error);
        setDiagnosisText("Ocurrió un error generando el diagnóstico.");
      } finally {
        setLoadingDiagnosis(false);
      }
    };

    fetchDiagnosis();
  }, [structuredData]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* ===== HEADER ===== */}
      <Navbar bg="white" expand="md" fixed="top" className="shadow-sm">
        <Container fluid className="px-4">
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <span className="text-primary fs-4">💡</span>
            HealthAI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav className="gap-3">
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Servicios</Nav.Link>
              <Nav.Link href="#">Contacto</Nav.Link>
            </Nav>
            <Button variant="link" className="p-2 text-secondary">
              <span className="material-symbols-outlined">notifications</span>
            </Button>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="rounded-circle ms-3"
              width="40"
              height="40"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== MAIN ===== */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5 mt-5">
        <Container fluid className="d-flex justify-content-center px-3 px-md-5">
          <Card
            className="p-4 p-md-5 shadow-lg rounded-4 w-100"
            style={{ maxWidth: "960px" }}
          >
            {/* Título */}
            <div className="text-center mb-4">
              <h2 className="fw-bold display-6">
                Análisis de Salud Asistido por IA
              </h2>
              <p className="text-muted lead">
                Resultados del modelo predictivo basado en tus síntomas.
              </p>
            </div>

            {/* Condiciones */}
            <h3 className="h5 fw-bold text-center mb-4">
              Probabilidades de Condiciones
            </h3>

            <Row className="g-4">
              {conditions.length > 0 ? (
                conditions.map((c, idx) => (
                  <Col key={idx} xs={12} md={4}>
                    <Card className="text-center p-4 h-100 border-0 bg-light rounded-4">
                      <div className="fs-1 mb-2">{c.icon}</div>
                      <Card.Text className="fw-semibold">{c.label}</Card.Text>
                      <h3 className="fw-bold text-primary display-6 my-3">
                        {c.probability}%
                      </h3>
                      <ProgressBar
                        now={c.probability}
                        variant="primary"
                        style={{ height: "6px" }}
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center text-muted">
                  Calculando probabilidades...
                </p>
              )}
            </Row>

            {/* 📌 Diagnóstico generado */}
            <div className="mt-5">
              <h3 className="h5 fw-bold text-center mb-3">
                Análisis del Modelo Generativo
              </h3>
              <Card className="p-3 bg-light rounded-4 shadow-sm border-0">
                {loadingDiagnosis ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" size="sm" /> Generando
                    diagnóstico...
                  </div>
                ) : (
                  <p className="mb-0 text-secondary" style={{ whiteSpace: "pre-wrap" }}>
                    {diagnosisText}
                  </p>
                )}
              </Card>
            </div>

            {/* Mapa */}
            <div className="mt-5">
              <h3 className="h5 fw-bold text-center mb-3">
                Centros de Atención Cercanos
              </h3>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm bg-secondary">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzBzAhQZN1LN7Cnn8ztl0K9893Ie1NVX_cpYT3EYW8Q-YK6S2vQeq7KDjYxMdmBOLIr_TYZjYb17LbZG7yyFmCS3tUP22yOvDr_WTmHuBUIjXOB60kQxP-oGRsN692sQPTcswUT-XPjiRO3dDeTW5CQuBqWCmml2IBHulQkz85akEq92dw7gBGDioZX967_ArVRhG-notMHXBRzw23lqpQprOgJHELqKcQ6rea-anK2W5DTwdN31-TYSlSUN8oMCjmv9kfOu12A"
                  alt="Mapa centros médicos"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>

            {/* Aviso */}
            <p className="text-center text-muted fst-italic small mt-4">
              Este resultado es solo una estimación y no reemplaza la valoración
              médica profesional.
            </p>

            {/* Botón */}
            <div className="text-center mt-4">
              <Button
                variant="primary"
                size="lg"
                className="d-inline-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined">share</span>
                Compartir Reporte
              </Button>
            </div>
          </Card>
        </Container>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white py-3 mt-auto text-center border-top">
        <Container>
          <p className="mb-0 text-muted small">
            © 2024 HealthAI. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Report;
