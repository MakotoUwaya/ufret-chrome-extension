import { ManifestV3Export } from '@crxjs/vite-plugin';

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'U-Fret utility',
  description:
    'U-Fret is a website with simple music scores. This Chrome extension provides a convenient way to use this site.',
  version: '0.1.0',
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: ['https://www.ufret.jp/*'],
      js: ['src/content/index.tsx'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  web_accessible_resources: [
    {
      resources: [
        // this file is web accessible; it supports HMR b/c it's declared in `rollupOptions.input`
        'src/welcome/welcome.html',
      ],
      matches: ['<all_urls>'],
    },
  ],
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'images/icon16.png',
      '32': 'images/icon32.png',
      '48': 'images/icon48.png',
      '128': 'images/icon128.png',
    },
  },
  icons: {
    '16': 'images/icon16.png',
    '32': 'images/icon32.png',
    '48': 'images/icon48.png',
    '128': 'images/icon128.png',
  },
  permissions: ['storage', 'tabs', 'activeTab', 'declarativeContent'],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
};

export default manifest;
