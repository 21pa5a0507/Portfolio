// Runs before paint. Stored preference is optional; blocked storage falls back to system CSS.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch{}})();`;
