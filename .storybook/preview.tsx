import type { Preview } from "@storybook/react";
import { I18nProviderClient } from "../src/i18n/next-international.client";
import "../src/app/globals.css";

const _messages = {
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
      <I18nProviderClient locale="en">
        <Story />
      </I18nProviderClient>
    ),
  ],
};

export default preview;
