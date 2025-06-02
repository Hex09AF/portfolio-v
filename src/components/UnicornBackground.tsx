"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Define proper types for the library
interface UnicornStudioScene {
  element: HTMLElement;
  destroy: () => void;
  contains?: (element: HTMLElement | null) => boolean;
}

interface UnicornStudioConfig {
  scale: number;
  dpi: number;
}

interface UnicornStudio {
  isInitialized: boolean;
  init: (config?: UnicornStudioConfig) => Promise<UnicornStudioScene[]>;
}

// Custom hook to handle script loading
const useUnicornStudio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    if (typeof window === "undefined") return undefined;

    const version = '1.4.25';
    const scriptUrl = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`;

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src="${scriptUrl}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if ((window as any).UnicornStudio) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setIsLoaded(true));
      }
      scriptRef.current = existingScript;
      return undefined;
    }

    // Create and load new script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && !existingScript) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  return {
    isLoaded,
    UnicornStudio: typeof window === "undefined" ? undefined : (window as any).UnicornStudio as UnicornStudio | undefined
  };
};

export default function UnicornBackground() {
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const sceneRef = useRef<UnicornStudioScene | null>(null);
  const { isLoaded, UnicornStudio } = useUnicornStudio();

  useEffect(() => {
    if (!isLoaded) return undefined;

    const initializeScene = async () => {
      const container = document.querySelector('[data-us-project="jPLCUDo529ZZ4LzXymes"]');
      if (!container) return;

      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
      }

      try {
        const scenes = await UnicornStudio?.init({
          scale: 1,
          dpi: 1.5,
        });

        if (scenes) {
          const ourScene = scenes.find(
            (scene) =>
              scene.element === container ||
              scene.element.contains(container)
          );
          if (ourScene) {
            sceneRef.current = ourScene;
            setTimeout(() => {
              setIsBackgroundVisible(true);
            }, 1000);
          }
        }
      } catch (err) {
        setTimeout(() => {
          setIsBackgroundVisible(true);
        }, 1000);
      }
    };

    initializeScene();

    return () => {
      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [UnicornStudio, isLoaded]);

  return (
    <motion.div
      data-us-project="jPLCUDo529ZZ4LzXymes"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        willChange: "opacity",
        transform: "translateZ(0)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isBackgroundVisible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}