import { useState } from "react";

function App() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const calcular = async (operacion: string) => {
    setError("");
    setResultado(null);

    // Validar que ambos campos tengan información
    if (numero1.trim() === "" || numero2.trim() === "") {
      setError("Por favor, ingresa los dos números.");
      return;
    }

    const a = Number(numero1);
    const b = Number(numero2);

    // Validar que sean números
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setError("Los valores ingresados deben ser números válidos.");
      return;
    }

    // Evitar división entre cero
    if (operacion === "divide" && b === 0) {
      setError("No es posible dividir entre cero.");
      return;
    }

    try {
      setCargando(true);

      // Enviar los datos al backend de Go
      const response = await fetch(
        "http://localhost:8080/api/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            a: a,
            b: b,
            operation: operacion,
          }),
        }
      );

      const data = await response.json();

      // Si el backend devuelve un error
      if (!response.ok) {
        setError(data.error || "Ocurrió un error.");
        return;
      }

      // Mostrar el resultado enviado por Go
      setResultado(data.result);
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo conectar con el servidor. Verifica que el backend esté funcionando."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="app">
      <section className="calculator">
        <h1>Calculator</h1>

        <p className="subtitle">
          Basic arithmetic calculator
        </p>

        <div className="input-group">
          <label htmlFor="numero1">First number</label>

          <input
            id="numero1"
            type="number"
            value={numero1}
            onChange={(e) => setNumero1(e.target.value)}
            placeholder="Enter a number"
          />
        </div>

        <div className="input-group">
          <label htmlFor="numero2">Second number</label>

          <input
            id="numero2"
            type="number"
            value={numero2}
            onChange={(e) => setNumero2(e.target.value)}
            placeholder="Enter a number"
          />
        </div>

        <div className="operations">
          <button onClick={() => calcular("add")} disabled={cargando}>
            +
          </button>

          <button onClick={() => calcular("subtract")} disabled={cargando}>
            −
          </button>

          <button onClick={() => calcular("multiply")} disabled={cargando}>
            ×
          </button>

          <button onClick={() => calcular("divide")} disabled={cargando}>
            ÷
          </button>
        </div>

        <div className="result">
          <span>Result</span>

          <strong>
            {cargando
              ? "Calculating..."
              : resultado !== null
              ? resultado
              : "—"}
          </strong>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;