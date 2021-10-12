import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import fetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const testShow = {
  name: "Half Life 2",
  summary:
    "The right man in the wrong place can make all the difference in the world.",
  seasons: [
    {
      id: 1,
      name: "Season 1",
      episodes: ["Empire Strikes Back", "Fun Times", "Brady Bunch"],
    },
    {
      id: 2,
      name: "Season 2",
      episodes: ["Empire Strikes Back", "Fun Times", "Brady Bunch"],
    },
    {
      id: 3,
      name: "Season 3",
      episodes: ["Empire Strikes Back", "Fun Times", "Brady Bunch"],
    },
  ],
};

test("Display renders without errors", () => {
  render(<Display />);
});

test("When fetch button is pressed, show component displays", async () => {
  // Arrange
  render(<Display />);

  fetchShow.mockResolvedValueOnce({
    data: testShow,
  });
  // Act
  const fetchButton = screen.queryByRole("button");
  userEvent.click(fetchButton);
  // Assert
  const showComponent = await screen.findByTestId("show-container");
  expect(showComponent).toBeInTheDocument();
});

test("When fetch button is pressed, options count matches season count", async () => {
  // Arrange
  render(<Display />);

  fetchShow.mockResolvedValueOnce({
    data: testShow,
  });
  // Act
  const fetchButton = screen.queryByRole("button");
  userEvent.click(fetchButton);
  // Assert
  const seasonsDropdown = await screen.findByRole("combobox");
  expect(seasonsDropdown).toHaveLength(testShow.seasons.length + 1);
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
