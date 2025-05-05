import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Protocolo usado no Strapi
        hostname: "localhost", // Hostname do Strapi
        port: "1337", // Porta onde o Strapi está rodando
        pathname: "/uploads/**", // Caminho das imagens
      },
    ],
  },
};

export default nextConfig;
