import type { Meta, StoryObj } from "@storybook/react";
import { ScoreGauge } from "./ScoreGauge";

const meta: Meta<typeof ScoreGauge> = {
  title: "Security/ScoreGauge",
  component: ScoreGauge,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" }
  },
  argTypes: {
    score: { control: { type: "range", min: 0, max: 100, step: 1 } }
  }
};

export default meta;
type Story = StoryObj<typeof ScoreGauge>;

export const LaunchReady: Story = {
  args: {
    score: 92,
    subMetrics: { dast: 98, sast: 95, secrets: 100, headers: 92 }
  }
};

export const ActionRecommended: Story = {
  args: {
    score: 76,
    subMetrics: { dast: 80, sast: 85, secrets: 90, headers: 65 }
  }
};

export const HighRisk: Story = {
  args: {
    score: 58,
    subMetrics: { dast: 60, sast: 55, secrets: 80, headers: 45 }
  }
};

export const LaunchBlocker: Story = {
  args: {
    score: 35,
    subMetrics: { dast: 30, sast: 40, secrets: 20, headers: 35 }
  }
};
