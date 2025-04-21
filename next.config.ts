import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // ou 'https' se seu Strapi usa HTTPS
        hostname: "localhost", // Domínio onde seu Strapi está rodando
        port: "1337", // Porta do Strapi
        pathname: "/uploads/**", // Caminho padrão de uploads do Strapi
      },
      // Adicione aqui outros domínios se você hospedar o Strapi em produção
      // Ex: { protocol: 'https', hostname: 'your-strapi-domain.com', pathname: '/uploads/**' }
    ],
  },
};

export default nextConfig;
