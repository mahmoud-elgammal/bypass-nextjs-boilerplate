import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import "../src/app/globals.css";

const messages = {
  common: {
    theme_system: "System",
    theme_light: "Light",
    theme_dark: "Dark",
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages as any}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;

