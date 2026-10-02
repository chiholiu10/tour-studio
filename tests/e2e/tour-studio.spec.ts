import { test, expect } from "@playwright/test";

const draft = {
  title: "A quieter canal",
  script: "Take a moment by the water. Notice the city reflected below.",
  note: "Curated example, not an AI response.",
  source: "example",
};

test("creates a location-specific draft, keeps edits in history, and exports text", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Give places a voice." })).toBeVisible();
  const script = page.getByRole("textbox", { name: "Tour script", exact: true });
  await script.fill("My edited draft stays safe.");
  await page.getByRole("radio", { name: /The Jordaan/ }).check();
  await page.getByRole("button", { name: "Create example draft" }).click();
  await expect(script).toHaveValue(/The Jordaan|Jordaan/);
  await page.getByRole("region", { name: "Make it your story" }).locator("summary").click();
  await page.getByRole("button", { name: "Restore", exact: true }).click();
  await expect(script).toHaveValue("My edited draft stays safe.");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download script as text" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.txt$/);
  await expect(page.getByRole("button", { name: "Generate MP3" })).toBeDisabled();
  expect(errors).toEqual([]);
});

test("failed generation preserves the draft and retry recovers", async ({ page }) => {
  let calls = 0;
  await page.route("**/api/studio/draft", (route) => {
    calls += 1;
    return route.fulfill({
      status: calls === 1 ? 502 : 200,
      contentType: "application/json",
      body: JSON.stringify(calls === 1 ? { error: "The provider is unavailable. Your draft is safe." } : draft),
    });
  });
  await page.goto("/");
  const script = page.getByRole("textbox", { name: "Tour script", exact: true });
  await script.fill("Keep this version.");
  await page.getByRole("button", { name: "Create example draft" }).click();
  await expect(page.getByRole("alert", { name: "Generation error" })).toContainText("Your draft is safe");
  await expect(script).toHaveValue("Keep this version.");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(script).toHaveValue(draft.script);
  await expect(page.getByRole("alert", { name: "Generation error" })).toHaveCount(0);
});

test("canceling a pending request restores editing without a late overwrite", async ({ page }) => {
  let finish: (() => void) | undefined;
  await page.route("**/api/studio/draft", async (route) => {
    await new Promise<void>((resolve) => {
      finish = resolve;
    });
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(draft) }).catch(() => {});
  });
  await page.goto("/");
  const script = page.getByRole("textbox", { name: "Tour script", exact: true });
  await script.fill("Keep my original.");
  await page.getByRole("button", { name: "Create example draft" }).click();
  await expect(page.getByRole("button", { name: "Cancel generation" })).toBeVisible();
  await expect(script).toBeDisabled();
  await expect.poll(() => Boolean(finish)).toBe(true);
  await page.getByRole("button", { name: "Cancel generation" }).click();
  finish?.();
  await expect(script).toBeEnabled();
  await script.fill("My newer edit.");
  await expect(script).toHaveValue("My newer edit.");
  await expect(page.getByRole("alert", { name: "Generation error" })).toHaveCount(0);
});

test("keyboard focus, text escaping, mobile layout and case-study navigation", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({ path: `test-results/tour-studio-${testInfo.project.name}.png`, fullPage: true });
  await page.getByText("Personal MVP", { exact: true }).click();
  await expect(page.getByRole("table")).toContainText("Not connected in this workspace");
  await expect(page.getByRole("table")).toContainText("Not built");
  await page.getByText("Personal MVP", { exact: true }).click();
  await page.reload();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to workspace" })).toBeFocused();
  const script = page.getByRole("textbox", { name: "Tour script", exact: true });
  await script.fill("<script>window.injected = true</script>");
  await expect(script).toHaveValue("<script>window.injected = true</script>");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  const popup = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Behind the build" }).click();
  const caseStudy = await popup;
  await expect(caseStudy.getByRole("heading", { name: "ElevenLabs exploration" })).toBeVisible();
  await expect(caseStudy.getByRole("main")).toContainText(
    "real-account synthesis test still requires server credentials",
  );
  await expect(script).toHaveValue("<script>window.injected = true</script>");
});

test("device preview reports an unavailable browser voice and stops when the script changes", async ({ page }) => {
  await page.addInitScript(() => {
    let attempt = 0;
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speak: (utterance: SpeechSynthesisUtterance) => {
          attempt += 1;
          if (attempt === 1)
            setTimeout(() => utterance.onerror?.({ error: "voice-unavailable" } as SpeechSynthesisErrorEvent), 0);
        },
        cancel: () => {},
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Device preview" }).click();
  await expect(page.getByRole("alert", { name: "Generation error" })).toContainText(
    "browser could not play this voice",
  );
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("button", { name: "Stop preview" })).toBeVisible();
  await page.getByRole("textbox", { name: "Tour script", exact: true }).fill("A new script stops the old preview.");
  await expect(page.getByRole("button", { name: "Device preview" })).toBeVisible();
  await expect(page.getByRole("alert", { name: "Generation error" })).toHaveCount(0);
});

test("shared defaults size controls, inherit theme changes and style the dialog", async ({ page }) => {
  await page.goto("/");
  const direction = page.getByRole("textbox", { name: "Creative direction optional" });
  await expect(direction).toHaveCSS("font-size", "16px");
  const duration = page.getByRole("button", { name: "30s", exact: true });
  expect((await duration.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  const download = page.getByRole("button", { name: "Download script as text" });
  expect((await download.boundingBox())?.width).toBeGreaterThanOrEqual(44);
  expect((await download.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  await page.evaluate(() => document.documentElement.style.setProperty("--text-body", "20px"));
  await expect(direction).toHaveCSS("font-size", "20px");
  await page.evaluate(() => document.documentElement.style.removeProperty("--text-body"));

  // The unconfigured MVP has no live-access trigger; exercise its native dialog surface directly.
  const dialog = page.locator("dialog");
  await dialog.evaluate((element: HTMLDialogElement) => element.showModal());
  const close = page.getByRole("button", { name: "Close access dialog" });
  expect((await close.boundingBox())?.width).toBeGreaterThanOrEqual(44);
  expect((await close.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  const code = page.getByRole("textbox", { name: "Workspace access code" });
  await expect(code).toHaveCSS("font-size", "16px");
  await expect(page.getByRole("button", { name: "Use access code" })).toBeDisabled();
  await close.focus();
  await expect(close).toHaveCSS("outline-style", "solid");
  // It was opened outside React state above; close through the same native API.
  await dialog.evaluate((element: HTMLDialogElement) => element.close());
  await expect(dialog).not.toBeVisible();
});
