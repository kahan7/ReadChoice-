module.exports = {
  content: ['./src/**/*.{html,js}'],
    mode: 'jit',
    purge: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        backgroundColor: {
          'brown': '#BAAC9A',
          '#434344': '#434344',
          "#656060": '#656060',
          "#392415": '#392415',
          '#D0D0D0': "#baac9a",
          '#f0f2f5':'#f0f2f5',
          'purple': '#616ba9',
          'faint-purple': '#7F86B4'
        },
        borderRadius: {
          '4xl': '2rem',
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderWidth: {
          '3': '3px',
          '5': '5px',
        },
        borderColor: {
          'primary': '#434344',
        },  
        h: {
          '10': '2.5rem',
          '20': '5rem',
          '30': '7.5rem',
          '40': '10rem',
          '50': '12.5rem',
          '60': '15rem',
          '70': '17.5rem',
          '80': '20rem',
          '90': '22.5rem',
        },
        w: {
          '10': '2.5rem',
          '20': '5rem',
          '30': '7.5rem',
          '40': '10rem',
          '50': '12.5rem',
          '60': '15rem',
          '70': '17.5rem',
          '80': '20rem',
          '90': '22.5rem',
        },
        colors: {
          primary: {
            100: '#F0F4F8',
            200: '#D9E2EC',
            300: '#A6C1E1',
            400: '#598ACD',
            500: '#185ABC',
            600: '#0E47A1',
            700: '#0C3D87',
            800: '#0A306E',
            900: '#07245E',
          },
          secondary: {
            100: '#FDF2F8',
            200: '#FCE7F3',
            300: '#FBCFE8',
            400: '#F9A8D4',
            500: '#F472B6',
            600: '#EB5286',
            700: '#C81E5E',
            800: '#9B1855',
            900: '#7B1F4B',
          },                                                                                                                                                                                                                                     
      
   
    }}},
    variants: {
      extend: {},
    },
    plugins: [],
 
  }