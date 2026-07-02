import { applyBuiltInTheme, applyCustomTheme } from "./utils";

// Apply the built-in theme as early as possible — at spec load, before any test
// runs. This is pure DOM work (no Cypress commands), so it does not need a hook.
applyBuiltInTheme();

// Custom themes are read from disk via cy.readFile, which requires a running
// command queue, so they load in a `before` hook. This also re-applies the
// built-in theme as a safety net in case the runner re-rendered its <head>.
before(() => {
  applyBuiltInTheme();
  applyCustomTheme();
});
