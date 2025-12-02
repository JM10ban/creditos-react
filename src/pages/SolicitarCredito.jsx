import { useState } from "react";

export default function SolicitarCredito() {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [cuota, setCuota] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);

  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return null;

    const tasa = 2.5 / 100;
    const valor = (monto * tasa) / plazo + monto / plazo;

    return Math.round(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !monto || !plazo) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    const nuevaCuota = calcularCuota(monto, plazo);

    const nuevaSolicitud = {
      nombre,
      monto,
      plazo,
      cuota: nuevaCuota,
    };

    setSolicitudes([...solicitudes, nuevaSolicitud]);
    setMensaje("Solicitud enviada con éxito ✔");

    setNombre("");
    setMonto("");
    setPlazo("");
    setCuota(null);
  };

  return (
    <div>
      <h1>Solicitar Crédito</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monto solicitado"
          value={monto}
          onChange={(e) => {
            setMonto(e.target.value);
            setCuota(calcularCuota(e.target.value, plazo));
          }}
        />

        <input
          type="number"
          placeholder="Plazo en meses"
          value={plazo}
          onChange={(e) => {
            setPlazo(e.target.value);
            setCuota(calcularCuota(monto, e.target.value));
          }}
        />

        {cuota && (
          <p>
            <strong>Cuota mensual estimada:</strong> ${cuota}
          </p>
        )}

        <button type="submit">Enviar Solicitud</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h2>Solicitudes Registradas</h2>
      <ul>
        {solicitudes.map((sol, index) => (
          <li key={index}>
            {sol.nombre} — ${sol.monto} a {sol.plazo} meses | Cuota: ${sol.cuota}
          </li>
        ))}
      </ul>
    </div>
  );
}
