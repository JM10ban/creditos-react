import { creditsData } from "../data/creditsData";
import CreditCard from "../components/CreditCard";

export default function Inicio() {
  return (
    <div>
      <h1>Productos CreditSmart</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {creditsData.map((credit) => (
          <CreditCard
            key={credit.id}
            nombre={credit.nombre}
            descripcion={credit.descripcion}
            tasa={credit.tasa}
            montoMin={credit.montoMin}
            montoMax={credit.montoMax}
          />
        ))}
      </div>
    </div>
  );
}
