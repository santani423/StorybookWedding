module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxs: '340px',
      xxs: '360px', //samsung galaxy s20 412
      xs: '375px', // iphone se 375x667 ok
      s: '390px', // iphone 12 pro 390x844 ok
      iphone: '412px', // iphone xr 414x896,iphone 14 pro max 430x932 ok
      mobile: '540px',  // surface duo 540x720 ok
      sm: '640px',
      md: '768px', // ipad min 768x1024  ok
      md2: '810px', // 
      md3: '850px', // assus zendbook 853 x 1280 ok
      tb: '900px', //  surface pro 7 912x1368 ok
      lg: '1024px', // ipad pro 1024x1366 ok
      xl: '1280px', // google chrome  1280x800 ok
      '2xl': '1281px',
      '3xl': '1536px',
    },
  },
};

//