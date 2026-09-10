package main

import "testing"

func TestCalculateAdd(t *testing.T) {
	result, err := Calculate(10, 5, "add")

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result != 15 {
		t.Errorf("expected 15, got %v", result)
	}
}

func TestCalculateSubtract(t *testing.T) {
	result, err := Calculate(10, 5, "subtract")

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result != 5 {
		t.Errorf("expected 5, got %v", result)
	}
}

func TestCalculateMultiply(t *testing.T) {
	result, err := Calculate(10, 5, "multiply")

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result != 50 {
		t.Errorf("expected 50, got %v", result)
	}
}

func TestCalculateDivide(t *testing.T) {
	result, err := Calculate(10, 5, "divide")

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result != 2 {
		t.Errorf("expected 2, got %v", result)
	}
}

func TestCalculateDivideByZero(t *testing.T) {
	_, err := Calculate(10, 0, "divide")

	if err == nil {
		t.Error("expected an error when dividing by zero")
	}
}

func TestCalculateInvalidOperation(t *testing.T) {
	_, err := Calculate(10, 5, "invalid")

	if err == nil {
		t.Error("expected an error for invalid operation")
	}
}
