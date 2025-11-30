# Quickstart: Docusaurus Documentation Site Styling

This guide provides steps to quickly set up and verify the Docusaurus styling changes.

## 1. Prerequisites

- Node.js (v18+) and npm installed.
- Access to the `physical-ai-and-humanoid-robotics` repository.

## 2. Set up the Frontend Project

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Docusaurus development server:**
    ```bash
    npm start
    ```
    This will open the Docusaurus site in your browser, typically at `http://localhost:3000`.

## 3. Verify Styling Changes

Once the development server is running, perform the following visual checks:

### Sidebar Styling

-   **Background Color**: Verify the sidebar background is `#FAF9F5`.
-   **Hover State**: Hover over sidebar items; verify the background changes to `#E8E6DC`.
-   **Active/Clicked State**: Click on a sidebar item; verify the background remains `#E8E6DC`.
-   **Text Size**: Confirm the sidebar text appears more compact.

### Content Styling

-   **Documentation Text Color**: Navigate to any documentation page; verify the main text color is `#3D3D3A`.
-   **Main Book Heading**: Observe main chapter headings; verify their color is dark black (`#000000`).

### Footer Styling

-   **Background Color**: Scroll to the bottom of any page; verify the footer background is `#191919`.

### Navigation Button Styling (Top Right)

-   **Login Button**: Verify the Login button has a white background, black border, and rounded corners.
-   **Signup Button**: Verify the Signup button has a black background, white text, and rounded corners.
-   **Hover Effect**: Hover over both the Login and Signup buttons; observe a smooth transition effect.

## 4. Troubleshooting

-   If styles are not applying, ensure `custom.css` is correctly linked in `docusaurus.config.ts`.
-   Check your browser's developer tools for any CSS errors or overridden styles.

---
