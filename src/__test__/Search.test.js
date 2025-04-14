import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../component/body/Body";
import "@testing-library/jest-dom";
import MockData from "../utils/Mock.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MockData);
    },
  });
});

test("Search Data Filter", async () => {
  await act(async () => {
    return render(
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    );
  });

  let cards1 = screen.getAllByTestId("ResCards");
  expect(cards1.length).toBe(8);

  let input = screen.getByTestId("SearchId");
  let btn = screen.getByRole("button", {name: "Search"})
  
  fireEvent.change(input, { target: { value: "Subway"}});
  fireEvent.click(btn);

  const cards2 = screen.getAllByTestId("ResCards");
  expect(cards2.length).toBe(1);
});
