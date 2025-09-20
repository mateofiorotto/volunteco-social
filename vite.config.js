import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default {
    plugins: [vue(), tailwindcss()],
    //para usar ngrok
    server: {
        allowedHosts: true
    }
}