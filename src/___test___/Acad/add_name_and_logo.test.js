import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNameAndLogo from "../../Pages/Acad/add_name_and_logo";
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

describe("AddNameAndLogo Component", () => {
    beforeEach(() => {
        useAcad.mockReturnValue({
            acad: { loading: false, message: "" },
            addNameAndLogo: jest.fn().mockResolvedValue({ success: true, message: "Success" }),
        });

        useNotification.mockReturnValue({
            showSuccess: jest.fn(),
            showError: jest.fn(),
        });
    });

    test("renders input fields and submit button", () => {
        render(<AddNameAndLogo />);

        expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
        expect(screen.getByText("submit")).toBeInTheDocument();
    });

    test("updates input field on change", () => {
        render(<AddNameAndLogo />);

        const nameInput = screen.getByPlaceholderText("name");
        fireEvent.change(nameInput, { target: { value: "Test School" } });

        expect(nameInput.value).toBe("Test School");
    });

    test("handles file upload", () => {
        render(<AddNameAndLogo />);

        const fileInput = screen.getByTestId("image-uploader");
        const file = new File(["test"], "test.png", { type: "image/png" });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(fileInput.files[0].name).toBe("test.png");

    });

    test("calls addNameAndLogo on form submission", async () => {
        const { addNameAndLogo } = useAcad();

        render(<AddNameAndLogo />);

        const nameInput = screen.getByPlaceholderText("name");
        fireEvent.change(nameInput, { target: { value: "Test School" } });

        const submitButton = screen.getByText("submit");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(addNameAndLogo).toHaveBeenCalledWith({ name: "Test School", logo: null });
        });
    });

    test("shows success notification on successful submission", async () => {
        const { showSuccess } = useNotification();

        render(<AddNameAndLogo />);

        fireEvent.click(screen.getByText("submit"));

        await waitFor(() => {
            expect(showSuccess).toHaveBeenCalledWith("Success");
        });
    });

    test("shows error notification on failed submission", async () => {
        useAcad.mockReturnValue({
            acad: { loading: false, message: "" },
            addNameAndLogo: jest.fn().mockResolvedValue({ success: false, message: "Error occurred" }),
        });

        const { showError } = useNotification();

        render(<AddNameAndLogo />);

        fireEvent.click(screen.getByText("submit"));

        await waitFor(() => {
            expect(showError).toHaveBeenCalledWith("Error occurred");
        });
    });
});
