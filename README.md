# TASK

## Project Description

**TASK** is a full-featured web application for daily task management. It allows users to organize their lives more efficiently by creating Collections that group all their Tasks. The app provides a fast and intuitive interface that enables you to:

- Create new Collections and add multiple Tasks inside each.
- Edit the name of a Collection or delete it entirely along with all its Tasks.
- Add, edit, or delete any Task individually.
- Download all Tasks in a Collection as a file, or download a single Task.
- Instantly sign in with your Google account with a single click, no complex registration steps required.

---

## Technologies Used

<div align="center">

<a href="https://react.dev/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="50"/></a>
<a href="https://laravel.com/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg" alt="Laravel" width="50"/></a>
<a href="https://www.mysql.com/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="MySQL" width="50"/></a>
<a href="https://mui.com/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" alt="MUI" width="50"/></a>
<a href="https://axios-http.com/" target="_blank"><img src="https://axios-http.com/assets/logo.svg" alt="Axios" width="50"/></a>
<a href="https://redux.js.org/" target="_blank"><img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="Redux" width="50"/></a>

</div>

- **React**: For building the interactive user interface.
- **Laravel**: For developing the backend API and business logic.
- **MySQL**: Database for storing all data.
- **MUI (Material UI)**: Modern UI component library for a beautiful and user-friendly interface.
- **Axios**: For handling HTTP requests between frontend and backend.
- **Redux**: Centralized state management for the frontend.

---

## Key Features

- Fast and secure Google OAuth login (one-click sign in).
- Modern, user-friendly interface.
- Download tasks or entire collections as files for backup.
- **Automatic support for both Dark and Light themes** based on your browser or system preferences.
- **Full support for both Arabic and English languages**; the app automatically detects and uses your browser's language settings.

---

## Theme & Language Support

- **Dark & Light Themes:**

  - The application automatically switches between dark and light modes according to your browser or operating system settings. No manual toggle needed!

- **Multilingual (Arabic & English):**
  - The interface language is automatically set to Arabic or English based on your browser's language preferences. You get a seamless experience in your preferred language.

---

## Getting Started

### 1. Prerequisites

- Node.js (latest LTS recommended)
- PHP >= 8.1
- Composer
- MySQL Server

### 2. Backend Setup (Laravel)

```bash
cd laravel
composer install
cp .env.example .env
# Edit your database credentials in the .env file
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

- **Note:** Make sure MySQL is running and your database credentials are correct in `.env`.

### 3. Frontend Setup (React)

```bash
cd ../react
npm install
npm run dev
```

- **Note:** You can update the API base URL in the frontend `.env` file if needed.

---

## Project Structure

```
TASK/
  laravel/   # Backend (Laravel API)
  react/     # Frontend (React App)
```

---

## Developer Tips

- Follow RESTful conventions for any new API endpoints.
- Use Redux for any global state management in the frontend.
- Use ESLint and Prettier to maintain code quality in the frontend.

---

## For Users

- Simply sign in with your Google account.
- Start creating Collections and adding your Tasks right away.
- All changes are instant and easy to manage.
- The app will always match your theme and language preferences automatically.

---

## Support & Contact

For any questions or suggestions, please contact me on x.com https://x.com/nooreldin_wd.

---

<div align="center">

**Wishing you a productive experience with TASK!**

</div>
