package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type CalculateRequest struct {
	A         float64 `json:"a"`
	B         float64 `json:"b"`
	Operation string  `json:"operation"`
}

type CalculateResponse struct {
	Result float64 `json:"result"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {

	// Permitir solicitudes desde el frontend
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	// Responder a la comprobación CORS del navegador
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	// Solo permitimos POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)

		json.NewEncoder(w).Encode(ErrorResponse{
			Error: "Method not allowed. Use POST.",
		})

		return
	}

	var request CalculateRequest

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(ErrorResponse{
			Error: "Invalid JSON.",
		})

		return
	}
	result, err := Calculate(
		request.A,
		request.B,
		request.Operation,
	)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(ErrorResponse{
			Error: err.Error(),
		})

		return
	}

	json.NewEncoder(w).Encode(CalculateResponse{
		Result: result,
	})
}

func main() {

	http.HandleFunc("/api/calculate", calculateHandler)

	fmt.Println("Servidor backend ejecutándose en http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		fmt.Println("Error al iniciar el servidor:", err)
	}
}
