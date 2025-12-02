import { useState } from "react";
import { creditsData } from "../data/creditsData";
import "./Simulador.css";   // ⬅️ Import del estilo

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
    <div className="simulador-container">
      <h1>Simulador de Créditos</h1>

      {/* Filtros */}
      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar crédito..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFiltroMonto(e.target.value)}>
          <option value="all">Todos los montos</option>
          <option value="10000000">Más de 10 millones</option>
          <option value="50000000">Más de 50 millones</option>
        </select>

        <select onChange={(e) => setFiltroTasa(e.target.value)}>
          <option value="none">Sin ordenar</option>
          <option value="asc">Tasa: menor a mayor</option>
        </select>
      </div>

      {/* Resultados */}
      <div className="tarjetas-container">
        {resultados.length === 0 ? (
          <p>No hay créditos disponibles</p>
        ) : (
          resultados.map((c) => (
            <div className="card-simulador" key={c.id}>
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
