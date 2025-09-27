import React from "react";
import "./Report.css";

const Report = ({ results }) => {
  // Ejemplo de datos si no recibes nada por props
  const defaultResults = [
    { id: 1, label: "Condición Cardiovascular", value: 65, icon: "❤️" },
    { id: 2, label: "Condición Respiratoria", value: 45, icon: "🫁" },
    { id: 3, label: "Condición Neurológica", value: 30, icon: "🧠" },
  ];

  const conditions = results || defaultResults;

  return (
    <div className="report-container d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="logo text-primary fw-bold">HealthAI</div>
          </div>
          <nav className="d-none d-md-flex gap-3">
            <a href="#" className="text-decoration-none text-muted">
              Inicio
            </a>
            <a href="#" className="text-decoration-none text-muted">
              Servicios
            </a>
            <a href="#" className="text-decoration-none text-muted">
              Contacto
            </a>
          </nav>
          <img
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZKeTOOpV7j4qQOdUv2CsCk8mnXfgs_-9kU7y8HjUP5WEouhNAAS1wp7I1EO1B738k0Xu4c3-IDjegi9TAdbdglNWoauXmbOsETm0htrM34wPV0lNFjtiG0lHPDHn66kJIcq6xysPl9ot6F9--R73LB3lWvaeDgHJXg7sD_C5CsplqRieZP3XZtJ0iQCZGpASb2hgmB_dTYq78vLCAHu-T2suqgPv3NuhRASXBJn-nW3ZdEtQrZtoE2kM2k4P3g0Ky1f7CNSiSEQ"
            alt="User"
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container py-5">
        <div className="bg-white rounded shadow p-4 p-md-5 mx-auto" style={{ maxWidth: "900px" }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Análisis de Salud Asistido por IA</h2>
            <p className="text-muted">
              Resultados del modelo predictivo basado en tus síntomas.
            </p>
          </div>

          {/* Probabilidades */}
          <h3 className="h5 fw-bold mb-4">Probabilidades de Condiciones</h3>
          <div className="row g-4">
            {conditions.map((c) => (
              <div key={c.id} className="col-12 col-md-4">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="display-4 mb-3">{c.icon}</div>
                    <p className="fw-semibold">{c.label}</p>
                    <p className="display-5 fw-bold text-primary">{c.value}%</p>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${c.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mapa */}
          <div className="mt-5 text-center">
            <h3 className="h5 fw-bold mb-3">Centros de Atención Cercanos</h3>
            <div className="ratio ratio-16x9 rounded shadow overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzBzAhQZN1LN7Cnn8ztl0K9893Ie1NVX_cpYT3EYW8Q-YK6S2vQeq7KDjYxMdmBOLIr_TYZjYb17LbZG7yyFmCS3tUP22yOvDr_WTmHuBUIjXOB60kQxP-oGRsN692sQPTcswUT-XPjiRO3dDeTW5CQuBqWCmml2IBHulQkz85akEq92dw7gBGDioZX967_ArVRhG-notMHXBRzw23lqpQprOgJHELqKcQ6rea-anK2W5DTwdN31-TYSlSUN8oMCjmv9kfOu12A"
                alt="Mapa con centros de atención médica"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center fst-italic text-muted small">
            Este resultado es solo una estimación y no reemplaza la valoración
            médica profesional.
          </p>

          {/* Botón compartir */}
          <div className="text-center mt-4">
            <button className="btn btn-primary px-4 fw-bold">
              Compartir Reporte
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto border-top">
        <small className="text-muted">
          © 2024 HealthAI. Todos los derechos reservados.
        </small>
      </footer>
    </div>
  );
};

export default Report;
