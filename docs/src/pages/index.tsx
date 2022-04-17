import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="py-16 bg-indigo-500">
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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div data-tailwind="true">
        <HomepageHeader />
      </div>
    </Layout>
  );
}
