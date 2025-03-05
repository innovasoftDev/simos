/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  //? Indicandole a Next que confie en la ruta de donde se obtienen la imagenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.slingacademy.com",
        port: "",
      },
    ],
  },
  transpilePackages: ["geist"],
};

module.exports = nextConfig;
