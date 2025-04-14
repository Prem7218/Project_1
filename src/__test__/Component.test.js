import { render, screen } from "@testing-library/react"
import Component from "../../testingTask/Component"

test("The Contact Info: ", () => {
    render(<Component />);

    const inputBox = screen.getAllByRole("textbox");
    expect(inputBox.length).toBe(2)
})