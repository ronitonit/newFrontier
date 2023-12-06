import React from "react";
import { render, screen } from "@testing-library/react";
import ControlCenter from "./App";

test("renders refetch button", async () => {
  render(<ControlCenter />);
  const refetchButton = await screen.findByRole("button", {
    name: /Refetch data/i,
  });
  expect(refetchButton).toBeInTheDocument();
});

test("renders message thus data fetching works", async () => {
  render(<ControlCenter />);
  const message = await screen.findByTestId("statusMessage");
  expect(message).toBeInTheDocument();
});

test("renders ship iamge", async () => {
  render(<ControlCenter />);
  const ship = await screen.findByAltText(/ship/i);
  expect(ship).toBeInTheDocument();
});
