/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            screens: {
                'limit': '768px',
            },
            fontSize: {
                mini: '.7rem',
                'semi-mini': '.8rem',
                tiny: '.9375rem'
            },
            colors: {
                primary: {
                    50: '#f5f7ff',
                    100: '#ebf0fe',
                    200: '#ced9fd',
                    300: '#b1c2fb',
                    400: '#7694f8',
                    500: '#3b66f5',
                    600: '#355cdd',
                    700: '#2c4db8',
                    800: '#233d93',
                    900: '#1d3278'
                },
                theme: {
                    text: 'rgba(18,18,23,.9)'
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/line-clamp')
    ]
}
