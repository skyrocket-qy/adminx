from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the page
    page.goto("http://localhost:3000")

    # Wait for the animated code block to be visible
    code_block = page.locator('.code-block-container')
    expect(code_block).to_be_visible()

    # Wait for a few seconds for the animation to play
    page.wait_for_timeout(5000)

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification_v3.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
