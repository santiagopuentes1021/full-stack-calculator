package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCalculateHandlerAdd(t *testing.T) {
	body := `{
		"a": 10,
		"b": 5,
		"operation": "add"
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/calculate",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf(
			"expected status 200, got %d",
			recorder.Code,
		)
	}

	var response CalculateResponse

	err := json.NewDecoder(recorder.Body).Decode(&response)

	if err != nil {
		t.Fatalf(
			"could not decode response: %v",
			err,
		)
	}

	if response.Result != 15 {
		t.Errorf(
			"expected result 15, got %v",
			response.Result,
		)
	}
}

func TestCalculateHandlerDivideByZero(t *testing.T) {
	body := `{
		"a": 10,
		"b": 0,
		"operation": "divide"
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/calculate",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	if recorder.Code != http.StatusBadRequest {
		t.Fatalf(
			"expected status 400, got %d",
			recorder.Code,
		)
	}

	var response ErrorResponse

	err := json.NewDecoder(recorder.Body).Decode(&response)

	if err != nil {
		t.Fatalf(
			"could not decode response: %v",
			err,
		)
	}

	if response.Error != "cannot divide by zero" {
		t.Errorf(
			"expected division by zero error, got %q",
			response.Error,
		)
	}
}

func TestCalculateHandlerInvalidJSON(t *testing.T) {
	body := `{
		"a": 10,
		"b": 5,
		"operation":
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/calculate",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	if recorder.Code != http.StatusBadRequest {
		t.Fatalf(
			"expected status 400, got %d",
			recorder.Code,
		)
	}
}

func TestCalculateHandlerInvalidMethod(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodGet,
		"/api/calculate",
		nil,
	)

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Fatalf(
			"expected status 405, got %d",
			recorder.Code,
		)
	}
}
