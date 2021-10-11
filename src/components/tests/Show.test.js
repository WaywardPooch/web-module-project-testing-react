import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={testShow} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  // Arrange
  render(<Show show={null} selectedSeason={"none"} />);
  // Act
  const loadingMessage = screen.queryByTestId("loading-container");
  // Assert
  expect(loadingMessage).toBeInTheDocument();
});

test("renders same number of options as seasons passed in", () => {
  render(<Show show={testShow} selectedSeason={"none"} />);
  const seasonOptions = screen.queryAllByTestId("season-option");
  expect(seasonOptions).toHaveLength(testShow.seasons.length);
});

test("handleSelect is called when an season is selected", () => {
  // Arrange
  const handleSelectMock = jest.fn();
  render(
    <Show
      show={testShow}
      selectedSeason={"none"}
      handleSelect={handleSelectMock}
    />
  );
  // Act
  const seasonsDropdown = screen.getByRole("combobox");
  userEvent.selectOptions(seasonsDropdown, ["1"]);
  // Assert
  expect(handleSelectMock).toBeCalled();
});

test("component renders when no seasons are selected and rerenders when a season is passed in", () => {
  // Arrange 1: Render without a selected season
  const { rerender } = render(<Show show={testShow} selectedSeason={"none"} />);
  // Act 1: Query the episode container
  let episodes = screen.queryByTestId("episodes-container");
  // Assert 1: Check if episodes are on screen
  expect(episodes).not.toBeInTheDocument();

  // Arrange 2: Rerender with a selected season
  rerender(<Show show={testShow} selectedSeason={"1"} />);
  // Act 2: Query the episode container
  episodes = screen.queryByTestId("episodes-container");
  // Assert 2: Check if episodes are on screen
  expect(episodes).toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
