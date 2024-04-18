/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config){
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    // for Tauri
    
    output: 'export',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
