import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { BrowserRouter } from "react-router";
import { store } from "./store";
import { Provider } from "react-redux";

export const backendUrl = "http://localhost:8000/api/";

if (window.navigator.language === "ar") {
  document.dir = "rtl";
} else {
  document.dir = "ltr";
}

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  palette: {
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    primary: {
      main: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#424242"
        : "#bdbdbd",
    },
    secondary: {
      main: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#bdbdbd"
        : "#424242",
    },
  },
  typography: {
    fontFamily: "cairo",
  },
  direction: document.dir,
});

const englishWord = [
  "get start with google", // 0
  "best way to handle your daily tasks.", // 1
  "select collection", // 2
  "logout", // 3
  "create collection", // 4
  "search", // 5
  "no collections", // 6
  "edit collection", // 7
  "delete collection", // 8
  "cancel", // 9
  "are you sure you want to logout? if yes, click logout, if no, click cancel to close the dialog.", // 10
  "collection name", // 11
  "at least 3 characters", // 12
  "here you can create a new collection, write the name of the collection, click create to save changes, cancel to close the dialog.", // 13
  "create", // 14
  "edit", // 15
  "here you can edit the collection, write the new name of the collection, click edit to save changes, cancel to close the dialog.", // 16
  "delete", // 17
  "are you sure you want to delete this collection? if yes, click delete, if no, click cancel to close the dialog.", // 18
  "all", // 19
  "completed", // 20
  "not completed", // 21
  "latest", // 22
  "oldest", // 23
  "date", // 24
  "status", // 25
  "search by title...", // 26
  "show", // 27
  "un complete", // 28
  "complete", // 29
  "download.txt", // 30
  "task name", // 31
  "task description", // 32
  "show task", // 33
  "edit task", // 34
  "delete task", // 35
  "are you sure you want to delete this task? if yes, click delete, if no, click cancel to close the dialog.", // 36
  "download task", // 37
  "are you sure you want to download this task? if yes, click download, if no, click cancel to close the dialog.", // 38
  "download", // 39
  "download collection tasks", // 40
  "are you sure you want to download all collection tasks? if yes, click download, if no, click cancel to close the dialog.", // 41
  "create task", // 42
  "no tasks found create new one", // 43
  "collection created successfully", // 44
  "collection deleted successfully", // 45
  "collection edited successfully", // 46
  "task created successfully", // 47
  "task deleted successfully", // 48
  "task edited successfully", // 49
];
const arabicWord = [
  "ابدأ مع جوجل", // 0
  "أفضل طريقة للتعامل مع مهامك اليومية.", // 1
  "اختر مجموعة", // 2
  "تسجيل خروج", // 3
  "انشاء مجموعة", // 4
  "بحث", // 5
  "لا يوجد مجموعة", // 6
  "تعديل المجموعة", // 7
  "حذف المجموعة", // 8
  "إلغاء", // 9
  "هل أنت متأكد من أنك تريد تسجيل الخروج؟ إذا كان الأمر كذلك، اضغط على تسجيل الخروج، إذا لم يكن الأمر كذلك، اضغط على إلغاء لإغلاق الحوار.", // 10
  "اسم المجموعة", // 11
  "على الأقل 3 أحرف", // 12
  "هنا يمكنك إنشاء مجموعة جديدة، اكتب اسم المجموعة، اضغط على إنشاء لحفظ التغييرات، اضغط على إلغاء لإغلاق الحوار.", // 13
  "إنشاء", // 14
  "تعديل", // 15
  "هنا يمكنك تعديل المجموعة، اكتب الاسم الجديد للمجموعة، اضغط على تعديل لحفظ التغييرات، اضغط على إلغاء لإغلاق الحوار.", // 16
  "حذف", // 17
  "هل أنت متأكد من أنك تريد حذف هذه المجموعة؟ إذا كان الأمر كذلك، اضغط على حذف، إذا لم يكن الأمر كذلك، اضغط على إلغاء لإغلاق الحوار.", // 18
  "الكل", // 19
  "مكتمل", // 20
  "غير مكتمل", // 21
  "أحدث", // 22
  "أقدم", // 23
  "التاريخ", // 24
  "الحالة", // 25
  "ابحث باسم المهمة...", // 26
  "عرض", // 27
  "غير مكتمل", // 28
  "مكتمل", // 29
  "تحميل.txt", // 30
  "اسم المهمة", // 31
  "وصف المهمة", // 32
  "عرض المهمة", // 33
  "تعديل المهمة", // 34
  "حذف المهمة", // 35
  "هل أنت متأكد من أنك تريد حذف هذه المهمة؟ إذا كان الأمر كذلك، اضغط على حذف، إذا لم يكن الأمر كذلك، اضغط على إلغاء لإغلاق الحوار.", // 36
  "تحميل المهمة", // 37
  "هل أنت متأكد من أنك تريد تحميل هذه المهمة؟ إذا كان الأمر كذلك، اضغط على تحميل، إذا لم يكن الأمر كذلك، اضغط على إلغاء لإغلاق الحوار.", // 38
  "تحميل", // 39
  "تحميل مهمات المجموعة", // 40
  "هل أنت متأكد من أنك تريد تحميل جميع مهمات المجموعة؟ إذا كان الأمر كذلك، اضغط على تحميل، إذا لم يكن الأمر كذلك، اضغط على إلغاء لإغلاق الحوار.", // 41
  "إنشاء المهمة", // 42
  "لا توجد مهام، قم بإنشاء مهمة جديدة", // 43
  "تم إنشاء المجموعة بنجاح", // 44
  "تم حذف المجموعة بنجاح", // 45
  "تم تعديل المجموعة بنجاح", // 46
  "تم إنشاء المهمة بنجاح", // 47
  "تم حذف المهمة بنجاح", // 48
  "تم تعديل المهمة بنجاح", // 49
];
export const translate = (word) => {
  const index = englishWord.indexOf(word);
  if (document.dir === "rtl") {
    return arabicWord[index];
  } else {
    return englishWord[index];
  }
};

if (document.dir === "rtl") {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
