import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="py-16 bg-indigo-500 md:pb-64">
      <div className="container">
        <div className="flex items-center justify-center w-16 h-16 p-2 mx-auto mb-4 bg-white rounded-full hover:animate-spin">
          <img src="/img/logo.svg" alt="" className="w-10 h-10" />
        </div>
        <h1 className="text-5xl font-bold text-center text-white">
          {siteConfig.title}
        </h1>
        <p className="mb-4 text-center text-white hero__subtitle">
          {siteConfig.tagline}
        </p>
        <div className="flex items-center justify-center mx-auto space-x-4">
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({
  icon,
  title,
  description,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="w-full text-center md:w-1/3">
      <div
        className={`w-12 h-12 mb-4 rounded-full mx-auto text-2xl text-white flex items-center font-bold justify-center ${iconBg}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="leading-snug text-gray-500">{description}</p>
    </div>
  );
}

function HomepageBestFeatures() {
  const { isDarkTheme } = useColorMode();

  return (
    <div
      className={`container py-10 md:pt-56 max-w-5xl ${
        isDarkTheme ? 'dark' : ''
      }`}
    >
      <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-10 md:flex-row">
        <Feature
          icon="🔥"
          iconBg="bg-red-200 dark:bg-red-500 dark:bg-opacity-50"
          title="Zero Runtime"
          description={
            <>
              We take care of your classNames. <br />
              Tailwind takes care of Styles.
            </>
          }
        />
        <Feature
          icon="💎"
          iconBg="bg-cyan-200 dark:bg-cyan-500 dark:bg-opacity-50"
          title="Automatic Types"
          description={
            <>
              Just declare your{' '}
              <span className="text-gray-900 dark:text-gray-400">variants</span>
              , <br />
              we take care of types.
            </>
          }
        />
        <Feature
          icon="💡"
          iconBg="bg-orange-300 dark:bg-orange-500 dark:bg-opacity-50"
          title="Simple API"
          description={
            <>
              Windstitch provides only one function.
              <br /> No Providers, no Context. <br />
              <span className="text-gray-900 dark:text-gray-400">
                Just Install and Use it
              </span>
            </>
          }
        />
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Windstitch is a 1.2kB, Simple Styling Library that helps you set when a className should be applied to a component.">
      <div data-tailwind="true">
        <HomepageHeader />
      </div>

      <main data-tailwind="true" style={{ position: 'relative' }}>
        <div className="hidden md:block w-full max-w-4xl overflow-hidden border-0 h-[400px] absolute inset-x-0 mx-auto -top-56 rounded-2xl shadow-2xl">
          <iframe
            src="https://codesandbox.io/embed/weathered-lake-352zp0?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark"
            className="w-full h-full border-0"
            title="weathered-lake-352zp0"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
        <HomepageBestFeatures />
      </main>
    </Layout>
  );
}
