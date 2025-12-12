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
    return Math.round(monto / plazo + (monto * tasa) / plazo);
  };

  // -----------------------------
  // Detectar pérdida de internet
  // -----------------------------
  useEffect(() => {
    const sinInternet = () => {
      setMensaje("❌ Se perdió la conexión a internet.");
    };

    window.addEventListener("offline", sinInternet);

    return () => {
      window.removeEventListener("offline", sinInternet);
    };
  }, []);

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

    if (!navigator.onLine) {
      setMensaje(
        editandoId
          ? "❌ No hay conexión a internet. No se pudo actualizar."
          : "❌ No hay conexión a internet. No se pudo guardar."
      );
      return;
    }

    if (!nombre || !monto || !plazo) {
      setMensaje("⚠ Todos los campos son obligatorios.");
      return;
    }

    const nuevaCuota = calcularCuota(Number(monto), Number(plazo));

    const datos = {
      nombre,
      monto: Number(monto),
      plazo: Number(plazo),
      cuota: nuevaCuota,
    };

    try {
      setLoading(true);
      setMensaje("");

      if (editandoId) {
        await updateDoc(doc(db, "solicitudes", editandoId), datos);
        setMensaje("✏️ Solicitud actualizada correctamente");
        setEditandoId(null);
      } else {
        await addDoc(collection(db, "solicitudes"), {
          ...datos,
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
      console.error("❌ Error Firebase:", error);
      setMensaje("❌ Error de conexión con Firebase");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Preparar edición
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
    if (!window.confirm("¿Seguro que deseas eliminar esta solicitud?")) return;

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
              {sol.nombre} — ${sol.monto} a {sol.plazo} meses | Cuota: $
              {sol.cuota}
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
