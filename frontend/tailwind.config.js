// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
//       },
//       tracking: {
//         tightest: "-0.05em",
//       },
//     },
//   },
//   plugins: [],
// };

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- key line: scans all files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
