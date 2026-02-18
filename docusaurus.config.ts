import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'T&M Softwares',
  tagline: 'Engineering software that matters.',
  favicon: 'img/favicon.svg',

  url: 'https://tmsoftwares.eu',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'projects',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'T&M Softwares',
      logo: {
        alt: 'T&M Softwares',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/projects/aicraft',
          label: 'Projects',
          position: 'left',
        },
        {
          href: 'https://github.com/TobiasTesauri',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {label: 'Aicraft', to: '/projects/aicraft'},
          ],
        },
        {
          title: 'Contatti',
          items: [
            {label: 'segreteria@tmsoftwares.eu', href: 'mailto:segreteria@tmsoftwares.eu'},
            {label: 'tobiastesauri@tmsoftwares.eu', href: 'mailto:tobiastesauri@tmsoftwares.eu'},
            {label: '+39 351 550 7405', href: 'tel:+393515507405'},
          ],
        },
        {
          title: 'Links',
          items: [
            {label: 'GitHub', href: 'https://github.com/TobiasTesauri'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} T&M Softwares — Tobias Tesauri`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['c', 'cpp', 'bash'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
