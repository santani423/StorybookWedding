module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxs: '340px',
      xxs: '360px', //samsung galaxy s20 412 ok
      xs: '375px', // iphone se 375x667 ok
      s: '390px', // iphone 12 pro 390x844 ok
      s2: '392px', //   pcoco 392x734 ok
      iphone: '412px', // iphone xr 414x896,iphone 14 pro max 430x932 ok
      mobile: '540px',  // surface duo 540x720 ok
      sm: '640px', //  huawei  686x977 potret ok
      md: '768px', // ipad min 768x1024 ok
      md2: '810px', // ipad air 820x1180 ok
      md3: '850px', // assus zendb 853 x 1280 ok
      tb: '900px', //  surface pro 7 912x1368 ok
      lg: '1024px', // ipad pro 1024x1366 ok
      lg2: '1090px', // huawei google chrome 1097x566 ok
      lg3: '1098px', // huawei  1092x566 ok
      xl: '1270px', // mozila  1280x800 ok
      '2xl': '1281px',
      '3xl': '1600px', // google chrome 1600 x 832 ok
      '4xl': '2200px', 
      '5xl': '2400px', // monitor 24 inc 2400 x 1181 
    },
  },
};

//