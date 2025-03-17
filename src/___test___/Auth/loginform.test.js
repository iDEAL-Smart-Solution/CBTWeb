import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../../Component/auth/loginForm";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";
import "@testing-library/jest-dom";

jest.mock('../../assets/iDEAL-logo.jpg', () => 'test-file-stub');

jest.mock("../../Zustand/auth", () => ({
    useAuth: jest.fn()
}));

jest.mock("../../Context/notificationContext", () => ({
    useNotification: jest.fn()
}));

describe("LoginForm Component", () => {
    let loginMock, showSuccessMock, showErrorMock;

    beforeEach(() => {
        loginMock = jest.fn();
        showSuccessMock = jest.fn();
        showErrorMock = jest.fn();
        
        useAuth.mockReturnValue({
            login: loginMock,
            auth: { loading: false, isAuthenticated: false }
        });
        
        useNotification.mockReturnValue({
            showSuccess: showSuccessMock,
            showError: showErrorMock
        });
    });

    test("renders login form correctly", () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    test("updates input fields correctly", () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("password");

        fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    test("calls login function on form submission", async () => {
        loginMock.mockResolvedValue({ success: true, message: "Login successful" });
        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("password"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
            expect(showSuccessMock).toHaveBeenCalledWith("Login successful");
        });
    });

    test("displays error message on failed login", async () => {
        loginMock.mockResolvedValue({ success: false, message: "Invalid credentials" });
        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("password"), { target: { value: "wrongpass" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(showErrorMock).toHaveBeenCalledWith("Invalid credentials");
        });
    });

    test("reloads page on successful authentication", async () => {
        delete window.location; 
        window.location = { reload: jest.fn() }; 
    
        useAuth.mockReturnValue({
            login: loginMock,
            auth: { loading: false, isAuthenticated: true }
        });
    
        render(<LoginForm />);
    
        await waitFor(() => {
            expect(window.location.reload).toHaveBeenCalled();
        });
    });
    
});
