module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: '360px',
      xs: '375px',
      s: '390px',
      iphone: '412px',
      sm: '640px',
      md: '768px',
      md2: '810px', // pastikan md2 setelah md dan sebelum lg
      md3: '850px', // pastikan md3 setelah md2 dan sebelum lg
      tb: '900px', // tambahkan breakpoint tb antara md2 dan lg
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
};