from playwright.sync_api import Page, expect
import time

def test_cyberpunk_page(page: Page):
    """
    This test verifies that the cyberpunk page is scrollable and has the new sections.
    """
    # 1. Arrange: Go to the cyberpunk page.
    page.goto("http://localhost:3000/cyberpunk")

    # 2. Act: Scroll down to the bottom of the page.
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(2) # Wait for animations to complete

    # 3. Assert: Check if the new sections are present.
    expect(page.get_by_role("heading", name="About The World")).to_be_visible()
    expect(page.get_by_role("heading", name="Features")).to_be_visible()
    expect(page.get_by_role("heading", name="Gallery")).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
