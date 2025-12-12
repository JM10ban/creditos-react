import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function SolicitarCredito() {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [cuota, setCuota] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  // -----------------------------
  // Calcular cuota
  // -----------------------------
  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return null;

    const tasa = 0.025;
    const cuotaMensual = monto / plazo + (monto * tasa) / plazo;
    return Math.round(cuotaMensual);
  };

  // -----------------------------
  // Cargar solicitudes (READ)
  // -----------------------------
  const cargarSolicitudes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "solicitudes"));
      const lista = querySnapshot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data(),
      }));
      setSolicitudes(lista);
    } catch (error) {
      console.error("❌ Error al cargar solicitudes:", error);
      setMensaje("❌ Error al cargar las solicitudes");
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  // -----------------------------
  // Crear o actualizar (CREATE / UPDATE)
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !monto || !plazo) {
      setMensaje("⚠ Todos los campos son obligatorios.");
      return;
    }

    const nuevaCuota = calcularCuota(Number(monto), Number(plazo));

    const datosSolicitud = {
      nombre,
      monto: Number(monto),
      plazo: Number(plazo),
      cuota: nuevaCuota,
    };

    try {
      setLoading(true);
      setMensaje("");

      if (editandoId) {
        // UPDATE
        await updateDoc(doc(db, "solicitudes", editandoId), datosSolicitud);
        setMensaje("✏️ Solicitud actualizada correctamente");
        setEditandoId(null);
      } else {
        // CREATE
        await addDoc(collection(db, "solicitudes"), {
          ...datosSolicitud,
          fecha: new Date(),
        });
        setMensaje("✅ Solicitud guardada correctamente");
      }

      setNombre("");
      setMonto("");
      setPlazo("");
      setCuota(null);

      cargarSolicitudes();
    } catch (error) {
      console.error("❌ Error:", error);
      setMensaje("❌ Error al guardar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Preparar edición (EDIT)
  // -----------------------------
  const editarSolicitud = (sol) => {
    setNombre(sol.nombre);
    setMonto(sol.monto);
    setPlazo(sol.plazo);
    setCuota(calcularCuota(sol.monto, sol.plazo));
    setEditandoId(sol.id);
  };

  // -----------------------------
  // Eliminar solicitud (DELETE)
  // -----------------------------
  const eliminarSolicitud = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta solicitud?"
    );
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "solicitudes", id));
      setMensaje("🗑️ Solicitud eliminada correctamente");
      cargarSolicitudes();
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      setMensaje("❌ Error al eliminar la solicitud");
    }
  };

  // -----------------------------
  // VISTA
  // -----------------------------
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
            const value = e.target.value;
            setMonto(value);
            setCuota(calcularCuota(value, plazo));
          }}
        />

        <input
          type="number"
          placeholder="Plazo en meses"
          value={plazo}
          onChange={(e) => {
            const value = e.target.value;
            setPlazo(value);
            setCuota(calcularCuota(monto, value));
          }}
        />

        {cuota && (
          <p>
            <strong>Cuota mensual estimada:</strong> ${cuota}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : editandoId
            ? "Actualizar Solicitud"
            : "Enviar Solicitud"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h2>Solicitudes Registradas</h2>

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <ul>
          {solicitudes.map((sol) => (
            <li key={sol.id}>
              {sol.nombre} — ${sol.monto} a {sol.plazo} meses | Cuota: ${sol.cuota}

              <button
                onClick={() => editarSolicitud(sol)}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </button>

              <button
                onClick={() => eliminarSolicitud(sol.id)}
                style={{ marginLeft: "5px" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
