import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";  // Import MemoryRouter
import Class from "../../Pages/Class";
import { useClass } from "../../Zustand/classSlice";
import { useNotification } from "../../Context/notificationContext";

// Mock Zustand store
jest.mock("../../Zustand/classSlice", () => ({
    useClass: jest.fn(),
}));

// Mock notification context
jest.mock("../../Context/notificationContext", () => ({
    useNotification: jest.fn(),
}));

describe("Class Component", () => {
    let fetchClassListMock, createClassMock, deleteClassMock, showSuccessMock, showErrorMock;

    beforeEach(() => {
        fetchClassListMock = jest.fn();
        createClassMock = jest.fn().mockResolvedValue({ success: true, message: "Class created successfully" });
        deleteClassMock = jest.fn().mockResolvedValue({ success: true, message: "Class deleted successfully" });
        showSuccessMock = jest.fn();
        showErrorMock = jest.fn();

        useClass.mockReturnValue({
            fetchClassList: fetchClassListMock,
            createClass: createClassMock,
            deleteClass: deleteClassMock,
            schClass: { loading: false, allschClass: [{ id: 1, name: "Science" }] },
        });

        useNotification.mockReturnValue({
            showSuccess: showSuccessMock,
            showError: showErrorMock,
        });
    });

    // it("renders correctly and fetches class list on mount", () => {
    //     render(
    //         <MemoryRouter>
    //             <Class />
    //         </MemoryRouter>
    //     );
    //     expect(fetchClassListMock).toHaveBeenCalled();
    //     expect(screen.getByText("")).toBeInTheDocument();
    // });

    it("updates input field correctly", () => {
        render(
            <MemoryRouter>
                <Class />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("class name"); 
        fireEvent.change(input, { target: { value: "Math" } });
        expect(input.value).toBe("Math");
    });

    it("creates a class and refreshes list on success", async () => {
        render(
            <MemoryRouter>
                <Class />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("class name");
        const button = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "Math" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(createClassMock).toHaveBeenCalledWith("Math");
            expect(showSuccessMock).toHaveBeenCalledWith("Class created successfully");
            expect(fetchClassListMock).toHaveBeenCalled();
        });
    });

    it("handles class deletion correctly", async () => {
        render(
            <MemoryRouter>
                <Class />
            </MemoryRouter>
        );
        const deleteButton = screen.getByTestId("delete");

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteClassMock).toHaveBeenCalledWith(1);
            expect(showSuccessMock).toHaveBeenCalledWith("Class deleted successfully");
            expect(fetchClassListMock).toHaveBeenCalled();
        });
    });

    it("shows an error message if class creation fails", async () => {
        createClassMock.mockResolvedValueOnce({ success: false, message: "Error creating class" });

        render(
            <MemoryRouter>
                <Class />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText("class name");
        const button = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "Math" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(showErrorMock).toHaveBeenCalledWith("Error creating class");
        });
    });
});
