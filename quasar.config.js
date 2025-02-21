/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';
import { fileURLToPath } from 'node:url';

export default defineConfig((ctx) => {
    return {
        // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
        supportTS: {
            tsCheckerConfig: {
                eslint: {
                    enabled: true,
                    files: './src/**/*.{ts,tsx,js,jsx,vue}',
                },
            },
        },

        // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli-webpack/boot-files
        boot: [
            'axios',
            'pinia',
            'auth'
        ],

        // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
        css: [
            'app.scss'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            'roboto-font', // optional, you are not bound to it
            'material-icons', // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
        build: {
            target: {
                browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
                node: 'node20'
            },

            typescript: {
                strict: true,
                vueShim: true
            },

            vueRouterMode: 'hash', // available values: 'hash', 'history'

            vitePlugins: [
                ['@intlify/unplugin-vue-i18n/vite', {
                    ssr: ctx.modeName === 'ssr',
                    include: [fileURLToPath(new URL('./src/i18n', import.meta.url))]
                }],

                ['vite-plugin-checker', {
                    vueTsc: true,
                    eslint: {
                        lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
                        useFlatConfig: true
                    }
                }, { server: false }]
            ]
        },

        // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
        framework: {
            config: {},
            plugins: [
                'Notify',
                'Cookies'
            ]
        },

        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
        ssr: {
            pwa: false,

            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            maxAge: 1000 * 60 * 60 * 24 * 30,
            // Tell browser when a file from the server should expire from cache (in ms)

            middlewares: [
                'render' // keep this as last one
            ]
        },

        // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
            workboxOptions: {}, // only for GenerateSW

            // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
            // if using workbox in InjectManifest mode
            // chainWebpackCustomSW (chain) {
            //   chain.plugin('eslint-webpack-plugin')
            //     .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
            // },

            manifest: {
                name: 'Quasar App',
                short_name: 'Quasar App',
                description: 'A Quasar Project',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [
                    {
                        src: 'icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
        electron: {
            preloadScripts: ['electron-preload'],
            inspectPort: 5858,
            bundler: 'packager',
            packager: {},
            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'quasar-project'
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-browser-extensions/configuring-bex
        bex: {
            contentScripts: [
                'my-content-script'
            ],
        },

        devServer: {
            open: true
        }
    }
}); 