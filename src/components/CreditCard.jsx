import "./CreditCard.css"; // Opcional para estilos

export default function CreditCard({ nombre, descripcion, tasa, montoMin, montoMax }) {
  return (
    <div className="credit-card">
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><strong>Tasa:</strong> {tasa}%</p>
      <p><strong>Monto mínimo:</strong> ${montoMin}</p>
      <p><strong>Monto máximo:</strong> ${montoMax}</p>
    </div>
  );
}
