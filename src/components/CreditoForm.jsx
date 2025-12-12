import CreditoForm from "../components/CreditoForm";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Conexión a Firebase

function CreditoForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    monto: "",
    ingresos: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await addDoc(collection(db, "solicitudes"), formData);
      setMensaje("Solicitud guardada en Firebase correctamente ✔");
      setFormData({ nombre: "", cedula: "", monto: "", ingresos: "" });
    } catch (error) {
      setMensaje("Error al guardar ❌ " + error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Nueva Solicitud de Crédito</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto solicitado"
          value={formData.monto}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="ingresos"
          placeholder="Ingresos mensuales"
          value={formData.ingresos}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default CreditoForm;
