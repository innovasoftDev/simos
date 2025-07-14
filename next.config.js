// next.config.js
// @ts-check

const crypto = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, 

  async headers() { 
    return [
      {
        source: '/(.*)',

        headers: [
          {
            key: 'Content-Security-Policy',
            value: (() => {
              const nonce = crypto.randomBytes(16).toString('base64');
              const ContentSecurityPolicy = `
                default-src 'self';
                script-src 'self' 'nonce-${nonce}' https://apis.google.com;
                style-src 'self' 'nonce-${nonce}';
                img-src 'self' data:;
                font-src 'self';
                connect-src 'self';
                frame-ancestors 'none';
              `;
              return ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim();
            })(), 
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;