import App, { Container, AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Layout from '@/containers/Layout';

// const DISABLE_LAYOUT_PAGES = ['/login'];
const DISABLE_LAYOUT_PAGES: string[] = [];

export default class NextAppLayout extends App {
  public static async getInitialProps({ Component, ctx, }: AppContext): Promise<AppInitialProps> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps, router } = this.props;

    return pageProps.statusCode === 404 || DISABLE_LAYOUT_PAGES.includes(router.route) ? (
      <div>
        <Component router={router} {...pageProps} />
        {/* <style dangerouslySetInnerHTML={{ __html: 'body { display: block; }' }}></style> */}
      </div>
    ) : (
        <Container>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{pageProps.title || 'Jein'}</title>
            {/* <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" /> */}
          </Head>
          {/* <Store> */}
          <Layout>
            <Component router={router} {...pageProps} />
          </Layout>
          {/* </Store> */}
        </Container>
      );
  }
}