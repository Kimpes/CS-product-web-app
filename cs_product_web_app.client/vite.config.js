import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import child_process from 'child_process'
import { env } from 'process'

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "cs_product_web_app.client";
//const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
//const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

//// Create certificate if it doesn't exist
//if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
//    if (0 !== child_process.spawnSync('dotnet', [
//        'dev-certs',
//        'https',
//        '--export-path',
//        certFilePath,
//        '--format',
//        'Pem',
//        '--no-password',
//    ], { stdio: 'inherit', }).status) {
//        throw new Error("Could not create certificate.");
//    }
//}

const target = env.ASPNETCORE_HTTPS_PORT ?
    `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ?
        env.ASPNETCORE_URLS.split(';')[0] :
        'https://localhost:7291';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],  // Changed from plugin() to react()
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './cert/localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert/localhost.pem')),
        },
        proxy: {
            '/weatherforecast': {
                target: target,
                secure: false,
                changeOrigin: true,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, res) => {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                }
            }
        },
        port: 5173
    }
})
