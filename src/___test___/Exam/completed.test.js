import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import this to use toBeInTheDocument
import ExamCompleted from "../../Pages/Exam/completed";
import { useAuth } from "../../Zustand/auth";

// Mock the Zustand auth store
jest.mock("../../Zustand/auth", () => ({
    useAuth: jest.fn(),
}));

describe("ExamCompleted Component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            auth: {
                user: {
                    firstName: "John",
                },
            },
        });
    });

    it("renders the correct greeting message with the user's first name", () => {
        render(<ExamCompleted />);
        expect(screen.getByText(/Hello John, you just successfully submitted your exam/i)).toBeInTheDocument();
    });

    it("displays the smiley image", () => {
        render(<ExamCompleted />);
        const image = screen.getByAltText("smiley");
        expect(image).toBeInTheDocument();
    });
    

    it("reminds the user to sign out", () => {
        render(<ExamCompleted />);
        expect(screen.getByText(/Remember to sign out please, check the button at the top right corner of the screen/i)).toBeInTheDocument();
    });
});
