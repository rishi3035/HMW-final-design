import "../tokens/dist/variables.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#06080F" },
        { name: "surface", value: "#0B0F19" }
      ]
    }
  }
};

export default preview;
