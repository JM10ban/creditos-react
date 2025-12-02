import { useState } from "react";
import { creditsData } from "../data/creditsData";

export default function Simulador() {
  const [search, setSearch] = useState("");
  const [filtroMonto, setFiltroMonto] = useState("all");
  const [filtroTasa, setFiltroTasa] = useState("none");

  // Filtrar productos según búsqueda
  let resultados = creditsData.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Filtrar por monto máximo
  if (filtroMonto !== "all") {
    resultados = resultados.filter(
      (c) => c.montoMax >= Number(filtroMonto)
    );
  }

  // Ordenar por tasa
  if (filtroTasa === "asc") {
    resultados = [...resultados].sort((a, b) => a.tasa - b.tasa);
  }

  return (
    <div>
      <h1>Simulador de Créditos</h1>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar crédito..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro por monto */}
      <select onChange={(e) => setFiltroMonto(e.target.value)}>
        <option value="all">Todos los montos</option>
        <option value="10000000">Más de 10 millones</option>
        <option value="50000000">Más de 50 millones</option>
      </select>

      {/* Orden por tasa */}
      <select onChange={(e) => setFiltroTasa(e.target.value)}>
        <option value="none">Sin ordenar</option>
        <option value="asc">Tasa: menor a mayor</option>
      </select>

      {/* Resultados */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {resultados.length === 0 ? (
          <p>No hay créditos disponibles</p>
        ) : (
          resultados.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #aaa",
                padding: "1rem",
                margin: "1rem",
                borderRadius: "8px",
                width: "250px",
              }}
            >
              <h3>{c.nombre}</h3>
              <p>Tasa: {c.tasa}%</p>
              <p>Montos: ${c.montoMin} - ${c.montoMax}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
