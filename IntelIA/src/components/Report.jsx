import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Navbar,
  Spinner,
} from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Report.css";

const API_URL = "https://eleven-webs-reply.loca.lt";

const Report = ({ structuredData }) => {
  const [conditions, setConditions] = useState([]);
  const [diagnosisText, setDiagnosisText] = useState("");
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [recommendationText, setRecommendationText] = useState("");
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  // 🧠 Fetch probabilidades
  useEffect(() => {
    if (!structuredData) return;
    const fetchProbabilities = async () => {
      try {
        const res = await fetch(`${API_URL}/predict-probabilities`, {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "bypass-tunnel-reminder": "157.253.226.99",
          },
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

  // 🧠 ⿢ Fetch recomendación generada por GPT-4o-mini
  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!structuredData) return;

      setLoadingRecommendation(true);
      setRecommendationText("");

      try {
        const promptData = {
          sx_ppal: structuredData.sx_ppal,
          inicio: structuredData.inicio,
          duracion: structuredData.duracion,
          curso: structuredData.curso,
          intensidad: structuredData.intensidad,
          localizacion: structuredData.localizacion,
          irradiacion: structuredData.irradiacion,
          factores_agravantes: structuredData.factores_agravantes,
          factores_aliviantes: structuredData.factores_aliviantes,
          antecedentes: structuredData.antecedentes,
          medicamentos: structuredData.medicamentos,
          alergias: structuredData.alergias,
          habitos: structuredData.habitos,
          red_flags: structuredData.red_flags,
          symptoms_present: structuredData.sintomas_asociados || [],
        };

        console.log("Prompt Data:", promptData);
        const res = await fetch(`${API_URL}/generate-recommendation/ `, {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "bypass-tunnel-reminder": "157.253.226.99",
          },
          body: JSON.stringify(promptData),
        });

        const data = await res.json();
        setRecommendationText(
          data.recommendation || "No recommendations generated."
        );
      } catch (error) {
        console.error("Error generando recomendación:", error);
        setRecommendationText("Ocurrió un error generando la recomendación.");
      } finally {
        setLoadingRecommendation(false);
      }
    };

    fetchRecommendation();
  }, [structuredData]);

  // 🌍 Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.warn("No se pudo obtener ubicación:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  // 📄 Generar PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte Médico Asistido por IA", 14, 20);
    doc.setFontSize(12);
    doc.text(
      "Este reporte contiene una estimación automática generada por modelos de IA. No sustituye una valoración médica real.",
      14,
      30,
      { maxWidth: 180 }
    );
    doc.text("📝 Síntomas Reportados:", 14, 45);
    doc.text(structuredData?.sintomas_asociados?.join(", ") || "-", 14, 52, {
      maxWidth: 180,
    });
    if (conditions.length > 0) {
      const tableData = conditions.map((c) => [c.label, `${c.probability}%`]);
      autoTable(doc, {
        head: [["Condición", "Probabilidad"]],
        body: tableData,
        startY: 65,
      });
    }
    doc.text(
      "🤖 Análisis Generativo:",
      14,
      (doc.lastAutoTable?.finalY || 65) + 15
    );
    doc.text(
      recommendationText || "No disponible",
      14,
      (doc.lastAutoTable?.finalY || 65) + 22,
      { maxWidth: 180 }
    );
    doc.save("Reporte-IA.pdf");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* ===== HEADER ===== */}
      <Navbar bg="white" expand="md" fixed="top" className="shadow-sm px-4">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2950/2950670.png"
            alt="Logo"
            style={{ width: 32, height: 32, marginRight: 10 }}
          />
          <span className="fw-bold fs-5">IntelIA</span>
        </div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTpScVCu6kdJmsUZ0rQSWM6I4ZpLgWfgIj3X5PaMUfD2yGjgSK4tGOCYEdNc5-7XgLw4_pAARSc9xdKLCJwaN8IO7qjMmgNGR_nTNY2Uk8hJLOMqHb8UVNz6I14HTmy9tIFT9YbI4AHmCD4aMQ4qur8ePpDGaWiiPSFt_0xHPV1QnDb_NyBhsGFONEE7z67viaF3k3hUF73zpntXAj0iR0c4t7cmVIFaH0XqxsirhzA21cMJWH59LlzkMy5YC9l537laxj6MLa7g"
          alt="Perfil"
          className="rounded-circle ms-auto"
          style={{ width: 36, height: 36 }}
        />
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
              <h2 className="fw-bold display-6">Reporte Asistido por IA</h2>
              <p className="text-muted lead">
                Resultados generados a partir de tus síntomas reportados.
              </p>
            </div>

            {/* Consentimiento / Reflexión */}
            <div className="alert alert-info rounded-4">
              <strong>ℹ️ Importante:</strong> Las estimaciones y análisis han
              sido generados por un modelo de IA.
              <br />
              Este sistema no sustituye la valoración ni el diagnóstico de un
              profesional médico. Usa esta información como guía inicial.
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

            {/* Diagnóstico */}
            <div className="mt-5">
              <h3 className="h5 fw-bold text-center mb-3">
                Análisis del Modelo Generativo
              </h3>
              <Card className="p-3 bg-light rounded-4 shadow-sm border-0">
                {loadingRecommendation ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" size="sm" /> Generando
                    diagnóstico...
                  </div>
                ) : (
                  <p
                    className="mb-0 text-secondary"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {recommendationText}
                  </p>
                )}
              </Card>
            </div>

            {/* Mapa de centros de salud */}
            {userLocation && (
              <div className="mt-5">
                <h3 className="h5 fw-bold text-center mb-3">
                  Centros de Salud Cercanos
                </h3>
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
                  <iframe
                    title="Mapa Centros de Salud"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyCre4oooBr4zFYj6p-p7XyMfJEnnAWOcM8&q=hospital&center=${userLocation.lat},${userLocation.lng}&zoom=13`}
                  />
                </div>
              </div>
            )}

            {/* Compartir */}
            <div className="text-center mt-5">
              <Button
                variant="primary"
                size="lg"
                className="d-inline-flex align-items-center gap-2"
                onClick={handleDownloadPDF}
              >
                Descargar Reporte en PDF
              </Button>
            </div>
          </Card>
        </Container>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white py-3 mt-auto text-center border-top">
        <Container>
          <p className="mb-0 text-muted small">
            © 2025 IntelIA. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Report;
