/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#21BF48", // 주 색상
        secondary: "#767676", // 보조 색상
        background: "#f5f5f5", // 배경 색상
        border: "#767676", // 테두리 색상
        text: "#333333", // 텍스트 색상
      },
    },
  },
  plugins: [],
};
