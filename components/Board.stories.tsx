import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Board from "./Board";
import { BoardType } from "../types/BoardType";

export default {
  title: "Components/Board",
  component: Board,
  argTypes: {
    onDelete: { action: "deleted" },
  },
} as Meta<typeof Board>;

const Template: StoryFn<typeof Board> = (args) => <Board {...args} />;

export const Default = Template.bind({});
Default.args = {
  board: {
    id: "1",
    name: "Project Tasks",
  } as BoardType,
};
