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
