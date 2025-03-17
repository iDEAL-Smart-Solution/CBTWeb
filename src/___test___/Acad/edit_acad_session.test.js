import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditAcadSession from "../../Pages/Acad/edit_acad_session";
import { useAcad } from "../../Zustand/acad_session";
import { useNotification } from "../../Context/notificationContext";
import "@testing-library/jest-dom";

// Mock Zustand store
jest.mock("../../Zustand/acad_session", () => ({
    useAcad: jest.fn(),
}));

// Mock Notification Context
jest.mock("../../Context/notificationContext", () => ({
    useNotification: jest.fn(),
}));

describe("EditAcadSession Component", () => {
    beforeEach(() => {
        useAcad.mockReturnValue({
            acad: { loading: false, message: "" },
            editAcadSession: jest.fn().mockResolvedValue({ success: true, message: "Session updated successfully" }),
        });

        useNotification.mockReturnValue({
            showSuccess: jest.fn(),
            showError: jest.fn(),
        });
    });

    test("renders input fields and submit button", () => {
        render(<EditAcadSession />);

        expect(screen.getByPlaceholderText("New Term")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("New Session")).toBeInTheDocument();
        expect(screen.getByText("submit")).toBeInTheDocument();
    });

    test("updates input field on change", () => {
        render(<EditAcadSession />);

        const termInput = screen.getByPlaceholderText("New Term");
        const sessionInput = screen.getByPlaceholderText("New Session");

        fireEvent.change(termInput, { target: { value: "2" } });
        fireEvent.change(sessionInput, { target: { value: "2024/2025" } });

        expect(termInput.value).toBe("2");
        expect(sessionInput.value).toBe("2024/2025");
    });

    test("calls editAcadSession on form submission", async () => {
        const { editAcadSession } = useAcad();
        render(<EditAcadSession />);

        fireEvent.change(screen.getByPlaceholderText("New Term"), { target: { value: "2" } });
        fireEvent.change(screen.getByPlaceholderText("New Session"), { target: { value: "2024/2025" } });

        fireEvent.click(screen.getByText("submit"));

        await waitFor(() => {
            expect(editAcadSession).toHaveBeenCalledWith("2", "2024/2025");
        });
    });

    test("shows success notification on successful update", async () => {
        const { showSuccess } = useNotification();
        render(<EditAcadSession />);

        fireEvent.click(screen.getByText("submit"));

        await waitFor(() => {
            expect(showSuccess).toHaveBeenCalledWith("Session updated successfully");
        });
    });

    test("shows error notification on failed update", async () => {
        useAcad.mockReturnValue({
            acad: { loading: false, message: "" },
            editAcadSession: jest.fn().mockResolvedValue({ success: false, message: "Update failed" }),
        });
        const { showError } = useNotification();

        render(<EditAcadSession />);
        fireEvent.click(screen.getByText("submit"));

        await waitFor(() => {
            expect(showError).toHaveBeenCalledWith("Update failed");
        });
    });

    test("displays loading state on submit", async () => {
        useAcad.mockReturnValue({
            acad: { loading: true, message: "" },
            editAcadSession: jest.fn(),
        });

        render(<EditAcadSession />);
        expect(screen.getByText("please wait...")).toBeInTheDocument();
    });
});
