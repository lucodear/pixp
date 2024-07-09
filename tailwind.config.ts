import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

const orchid = {
    50: '#fcf6fd',
    100: '#f7ecfb',
    200: '#efd8f6',
    300: '#e5b8ef',
    400: '#CE93D8',
    500: '#c062d3',
    600: '#ab47bc',
    700: '#8a3497',
    800: '#732c7c',
    900: '#612966',
    950: '#3d1042'
};

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'selector',
    theme: {
        screens: {
            sm: '640px',
            md: '804px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        backgroundSize: {
            '16': '16px'
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                orchid,
                base: colors.zinc[950],
                bg: colors.zinc[100],
                dark: {
                    base: colors.zinc[300],
                    bg: colors.zinc[950]
                }
            },
            fontFamily: {
                sans: [
                    '-apple-system,BlinkMacSystemFont',
                    'Segoe UI',
                    'Noto Sans',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji'
                ]
            }
        }
    },
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.contained': {
                    '@apply px-4': {},
                    '@apply md:max-w-[60rem] mx-auto': {}
                },
                '.text-primary': {
                    '@apply text-orchid-600 dark:text-orchid-400': {}
                },
                '.theme-colors': {
                    '@apply bg-zinc-100 text-zinc-950': {},
                    '@apply dark:bg-zinc-950 dark:text-zinc-300': {}
                },
                '.theme-colors-blurry': {
                    '@apply bg-zinc-100/50 text-zinc-950': {},
                    '@apply dark:bg-zinc-950/90 dark:text-zinc-300': {},
                    '@apply backdrop-blur-md': {}
                },
                '.theme-colors-invert': {
                    '@apply bg-zinc-950 text-zinc-100': {},
                    '@apply dark:bg-zinc-300 dark:text-zinc-950': {}
                },
                '.theme-colors-invert-blurry': {
                    '@apply bg-zinc-950/90 text-zinc-100': {},
                    '@apply dark:bg-zinc-300/50 dark:text-zinc-950': {},
                    '@apply backdrop-blur-md': {}
                },
                '.text-subtle': {
                    '@apply text-zinc-500': {}
                }
            });
        })
    ]
} satisfies Config;
