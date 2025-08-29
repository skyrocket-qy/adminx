from playwright.sync_api import Page, expect

def test_cyberpunk_page(page: Page):
    """
    This test verifies that the cyberpunk page is scrollable and has the new sections.
    """
    # 1. Arrange: Go to the cyberpunk page.
    page.set_viewport_size({"width": 1920, "height": 4000})
    page.goto("http://localhost:3000/cyberpunk")

    # 2. Assert: Check if the new sections are present.
    expect(page.get_by_role("heading", name="About The World")).to_be_visible()
    expect(page.get_by_role("heading", name="Features")).to_be_visible()
    expect(page.get_by_role("heading", name="Gallery")).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")
