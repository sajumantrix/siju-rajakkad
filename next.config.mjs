/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async headers() {
    const baseHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    const csp = [
      "default-src 'self'",
      "img-src 'self' data: https://cdn.sanity.io",
      "font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com",
      "script-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://*.api.sanity.io https://cdn.sanity.io",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/((?!studio).*)",
        headers: [...baseHeaders, { key: "Content-Security-Policy", value: csp }],
      },
      {
        source: "/studio/:path*",
        headers: baseHeaders,
      },
    ];
  },
};

export default nextConfig;
