import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { beforeEach } from "vitest";

describe("Calculator", () => {
      beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the calculator interface", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Calculator" })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("First number")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Second number")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Result")
    ).toBeInTheDocument();
  });

  it("calculates an addition", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: 15,
      }),
    
    });

    render(<App />);

    const firstInput = screen.getByLabelText("First number");
    const secondInput = screen.getByLabelText("Second number");

    await user.type(firstInput, "10");
    await user.type(secondInput, "5");

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(await screen.findByText("15")).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalled();
  });

  it("shows an error when dividing by zero", async () => {
    const user = userEvent.setup();

    render(<App />);

    const firstInput = screen.getByLabelText("First number");
    const secondInput = screen.getByLabelText("Second number");

    await user.type(firstInput, "10");
    await user.type(secondInput, "0");

    await user.click(screen.getByRole("button", { name: "÷" }));

    expect(
      screen.getByText("No es posible dividir entre cero.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows an error when the backend returns an error", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Invalid operation",
      }),
    });

    render(<App />);

    const firstInput = screen.getByLabelText("First number");
    const secondInput = screen.getByLabelText("Second number");

    await user.type(firstInput, "10");
    await user.type(secondInput, "5");

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(
      await screen.findByText("Invalid operation")
    ).toBeInTheDocument();
  });

  it("shows an error when the fields are empty", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(
      screen.getByText("Por favor, ingresa los dos números.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows an error when the backend cannot be reached", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockRejectedValue(
      new Error("Network error")
    );

    render(<App />);

    const firstInput = screen.getByLabelText("First number");
    const secondInput = screen.getByLabelText("Second number");

    await user.type(firstInput, "10");
    await user.type(secondInput, "5");

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(
      await screen.findByText(
        "No se pudo conectar con el servidor. Verifica que el backend esté funcionando."
      )
    ).toBeInTheDocument();
  });

  it("shows a generic error when the backend does not provide an error message", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<App />);

    const firstInput = screen.getByLabelText("First number");
    const secondInput = screen.getByLabelText("Second number");

    await user.type(firstInput, "10");
    await user.type(secondInput, "5");

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(
      await screen.findByText("Ocurrió un error.")
    ).toBeInTheDocument();
  });

});

