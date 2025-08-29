from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set a generous viewport size
        page.set_viewport_size({"width": 1280, "height": 800})

        # Glassmorphism
        page.goto("http://localhost:3000/Glassmorphism")
        page.wait_for_timeout(2000)  # Wait for animations
        page.screenshot(path="jules-scratch/verification/glassmorphism.png")

        # Retro
        page.goto("http://localhost:3000/Retro")
        page.wait_for_timeout(2000)  # Wait for page to load
        page.screenshot(path="jules-scratch/verification/retro.png")

        # Animated
        page.goto("http://localhost:3000/Animated")
        page.wait_for_timeout(2000)  # Wait for animations
        page.screenshot(path="jules-scratch/verification/animated.png")

        browser.close()

if __name__ == "__main__":
    run()
