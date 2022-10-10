
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import commonjs from '@rollup/plugin-commonjs'
import inject from '@rollup/plugin-inject'

export default defineNuxtConfig({
  meta: {
    title: 'Voice',
    meta: [{ 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' 
    }, {
      hid: 'keywords',
      name: 'keywords',
      content: '',
    }, {
      hid: 'description',
      name: 'description',
      content: 'ECHO',
    }],
    link: [{
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/x-icon'
    }, {
      ref: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    }, {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    }, {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: ''
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    }]
  },
  buildModules: [
    '@pinia/nuxt',
  ],
  css: [
    'remixicon/fonts/remixicon.css',
    'element-plus/dist/index.css',
    '@/styles/_element-plus.scss',
    '@/styles/_base.scss',
    '@/styles/themes/_default.scss',
    '@/styles/highlight/github.scss'
  ],
  vite: {
    // plugins: [eslintPlugin()],
    plugins: [
      // polyfillExports(),
      // commonjs(),
      // inject({ Buffer: ['buffer', 'Buffer'] })
    ],
    optimizeDeps: {
      esbuildOptions: {
        // Fix global is not defined error
        define: {
          global: 'globalThis'
        },
        plugins: [
          // Without this, npm run dev will output Buffer or process is not defined error
          NodeGlobalsPolyfillPlugin({
            buffer: true
          })
        ]
      }
    },
    build: {
      rollupOptions: {
        // plugins: [nodePolyfills()],
        // output: { format: 'cjs' }
      },
      commonjsOptions: {
        transformMixedEsModules: false
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/_var.scss";',
        }
      }
    }
  },
  ssr: false
})
