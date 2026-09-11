/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'nfs-dark': '#0b0e14',
        'nfs-card': '#111726',
        'nfs-card-alt': '#161e31',
        'nfs-pink': '#ff007f',
        'nfs-cyan': '#00f0ff',
        'nfs-yellow': '#fde047',
        'nfs-purple': '#9333ea',
      },
      fontFamily: {
        racing: ['Orbitron', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 15px rgba(255, 0, 127, 0.45)',
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.45)',
      }
    },
  },
  plugins: [],
};
