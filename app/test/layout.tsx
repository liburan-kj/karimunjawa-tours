import '../globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karimunjawa Tours - SuperDesign Version",
  description: "Karimunjawa Tours page designed with SuperDesign",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        {/* Tailwind CSS and Iconify */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
        
        {/* Google Fonts */}
        <style>
          {'@import url(\'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap\');'}
        </style>
        
        {/* Custom CSS from SuperDesign */}
        <style>
          {`
            :root {
              --primary: #0EA5E9;
              --accent: #F97316;
              --earth: #78350F;
              --sea: #0369A1;
              --tropical: #065F46;
            }

            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              background-color: #FAFAF9;
              color: #1C1917;
            }

            .heading-font {
              font-family: 'Outfit', sans-serif;
            }

            .glass-nav {
              background-color: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .tour-card:hover .card-image {
              transform: scale(1.05);
            }
            
            .custom-gradient {
              background: linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%);
            }

            .parallax-bg {
              background-attachment: fixed;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }
          `}
        </style>
        
        <div className="w-full" data-sd-id="1">
          {children}
        </div>
        
        {/* SuperDesign Runtime Script */}
        <script type="module">
          {(`
            (function() {
              document.addEventListener('wheel', function(e) {
                if (e.ctrlKey) e.preventDefault();
              }, { passive: false });
            })();
          `)}
        </script>
        <script type="module">
          {(`
            // SuperDesign Runtime
            console.log('[SuperDesign] Preview loaded for versionId:', "test-layout");

            window.__SUPERDESIGN_PREVIEW__ = {
              versionId: "test-layout",
              timestamp: new Date().toISOString(),
              _modernScreenshotModule: null,

              sendMessage: function(type, data) {
                if (window.parent) {
                  window.parent.postMessage({
                    source: 'superdesign-preview',
                    type: type,
                    data: data,
                    versionId: this.versionId
                  }, '*');
                }
              },

              ready: function() {
                this.sendMessage('ready', { timestamp: Date.now() });
              },

              _captureScreenshotInternal: async function() {
                // Simplified version - we don't need screenshot functionality for this page
                return {
                  dataUrl: '',
                  viewportWidth: window.innerWidth,
                  viewportHeight: window.innerHeight,
                  pixelRatio: window.devicePixelRatio || 1
                };
              },

              autoCapture: async function() { },
              captureScreenshot: async function() { return ''; }
            };

            // Font loading helpers (simplified)
            window.__SUPERDESIGN_PREVIEW__.loadedFonts = new Set();
            window.__SUPERDESIGN_PREVIEW__.loadGoogleFont = function(fontFamily) { };
            window.__SUPERDESIGN_PREVIEW__.loadedCustomFonts = new Set();
            window.__SUPERDESIGN_PREVIEW__.loadCustomFont = function(fontInfo) { };

            // Theme sync (simplified)
            window.__SUPERDESIGN_PREVIEW__.applyTheme = function(payload, isDark) { };

            // Message listener
            window.addEventListener('message', function(event) { });

            // Page lifecycle
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() { window.__SUPERDESIGN_PREVIEW__.ready(); });
            } else {
              window.__SUPERDESIGN_PREVIEW__.ready();
            }

            function onPageFullyLoaded() {
              requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                  setTimeout(function() {
                    window.__SUPERDESIGN_PREVIEW__.sendMessage('loaded', { timestamp: Date.now() });
                  }, 1500);
                });
              });
            }

            if (document.readyState === 'complete') {
              onPageFullyLoaded();
            } else {
              window.addEventListener('load', onPageFullyLoaded);
            }
          `)}
        </script>
      </body>
    </html>
  );
}