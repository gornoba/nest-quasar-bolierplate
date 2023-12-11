/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { configure } = require("quasar/wrappers");
const { resolve, join } = require("path");

const packageVersion = process.env.npm_package_version; // 현재 프로젝트 버전 가져오기

module.exports = configure((/* ctx */) => ({
  eslint: {
    fix: true,
    warnings: true,
    errors: true,
  },
  // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
  preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://v2.quasar.dev/quasar-cli-vite/boot-files
  boot: ["unocss", "vueDaumPostcode", "bus", "firebase"],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
  css: ["app.scss"],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    "roboto-font", // optional, you are not bound to it
    "material-icons",
    "material-symbols-outlined",
    "fontawesome-v6",
    "eva-icons",
  ],

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
  build: {
    target: {
      browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
      node: "node16",
    },
    alias: {
      "@": resolve(__dirname, "/src"),
      "~": resolve(__dirname, "/node_modules"),
    },
    vueRouterMode: "history", // available values: 'hash', 'history'
    distDir: join(__dirname, "..", "./backend/front"), // 빌드 파일 설치 경로
    rollupOptions: {
      output: {
        // 빌드 파일 이름 설정 (프로젝트 버전과 함께 export)
        entryFileNames: `assets/[name]-${packageVersion}.min.js`,
        chunkFileNames: `assets/[name]-${packageVersion}.min.js`,
        assetFileNames: `assets/[name]-${packageVersion}-.min.[ext]`,
      },
    },
    vitePlugins: [["unocss/vite", {}]],
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
  devServer: {
    open: true, // opens browser window automatically
    port: 8001,
  },
  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
  framework: {
    config: {},
    lang: "ko-kr",

    // iconSet: 'material-icons', // Quasar icon set
    // lang: 'en-US', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: ["Cookies", "Dialog"],
  },

  // animations: 'all', // --- includes all animations
  // https://v2.quasar.dev/options/animations
  animations: [],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
  // sourceFiles: {
  //   rootComponent: 'src/App.vue',
  //   router: 'src/router/index',
  //   store: 'src/store/index',
  //   registerServiceWorker: 'src-pwa/register-service-worker',
  //   serviceWorker: 'src-pwa/custom-service-worker',
  //   pwaManifestFile: 'src-pwa/manifest.json',
  //   electronMain: 'src-electron/electron-main',
  //   electronPreload: 'src-electron/electron-preload'
  // },

  // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
  ssr: {
    pwa: false,
    prodPort: 3000, // The default port that the production server should use
    middlewares: [
      "render", // keep this as last one
    ],
  },
  // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
  pwa: {
    workboxMode: "generateSW", // or 'injectManifest'
    injectPwaMetaTags: true,
    swFilename: "sw.js",
    manifestFilename: "manifest.json",
    useCredentialsForManifestTag: false,
  },
  cordova: {},
  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },
  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
  electron: {
    inspectPort: 5858,
    bundler: "packager", // 'packager' or 'builder'
    packager: {},
    builder: {
      appId: "nest-quasar-bolilerplate",
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
  bex: {
    contentScripts: ["my-content-script"],
  },
}));
