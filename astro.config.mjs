import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import auth from 'auth-astro';

// workaround for https://github.com/nowaythatworked/auth-astro/issues/50
const define = ['import.meta.env', 'process.env']
    .map((env) => ({
        [`${env}.GITHUB_CLIENT_ID`]: JSON.stringify(process.env.GITHUB_CLIENT_ID),
        [`${env}.GITHUB_CLIENT_SECRET`]: JSON.stringify(process.env.GITHUB_CLIENT_SECRET),
        [`${env}.AUTH_TRUST_HOST`]: JSON.stringify(process.env.AUTH_TRUST_HOST),
        [`${env}.AUTH_SECRET`]: JSON.stringify(process.env.AUTH_SECRET)
    }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});

export default defineConfig({
    site: 'https://pixp.lucode.ar',
    output: 'server',
    integrations: [
        tailwind({
            applyBaseStyles: false
        }),
        auth(),
        icon({
            iconDir: 'src/components/ui/graphics/icons'
        })
    ],
    vite: {
        ssr: {
            external: ['node:path']
        },
        define
    },
    output: 'server',
    adapter: cloudflare()
});
