# MFNews Frontend 

This is a simple news manage app that allows users to add, edit, and delete articles from the feed.
Design based on the challenge [images](https://drive.google.com/file/d/1feqr5uDxmJPVnFIUymm8VOp62bwQV_zy/view?usp=sharing).

## How to run the app

__Note:__ This project is related to this [backend](https://github.com/sjcuello/MFNews-backend.git) project. Make sure to run the backend server first.

1. Clone this repository
    ```bash
    git clone https://github.com/sjcuello/MFNews-frontend.git
    ```
2. Enter the project directory
    ```bash
    cd MFNews-frontend
    ```
3. Install dependencies
    ```bash
    pnpm install
    ```
4. Copy the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```

5. To start the development server
    ```bash
    pnpm run dev
    ```
6. Open `http://localhost:5173` in your browser

### Routes
- `/` - Home page
- `/trash-bin` - Trash bin
- `/something-else` - Error page
- `/:id` - Article details page

## Considerations
This app is built with a modern React setup, using:
- Redux to manage the app’s state in a predictable way.
- Redux Thunk for handling async actions like API calls.
- Material-UI for clean, responsive UI components and styling.
- Yup to validate forms easily and reliably.
- React Router to handle navigation between pages.
- CSS Modules for scoped, maintainable styles.
- TypeScript for better code quality and type safety.
- Vite as the fast and modern build tool for development.
##### Pages
- Home page: Displays all articles available in the feed. You can click on an article to view its details, edit it, or delete it.
- Article details page: Displays the details of a specific article.
- Add/Edit Article: using a Drawer component to add or edit an article.
- Trash bin: Displays a deleted articles list that can be restored or permanently deleted.
- Error page: Displays a message when the user navigates to an invalid route.

## Technologies Used
- React
- TypeScript
- Vite
- Redux
- Material-UI
- React-Router
- React-Redux
- Redux-Thunk
- CSS Modules
- Yup
