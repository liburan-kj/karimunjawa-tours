"use client";

import React, { useState } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from "@tiptap/react";

export function formatVideoEmbedUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // If user pasted raw iframe HTML like <iframe src="..."></iframe>
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return formatVideoEmbedUrl(iframeMatch[1]);
  }

  // YouTube standard watch, shorts, or youtu.be URL
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return trimmed;
}

export interface IframeNodeAttrs {
  src: string;
  width?: string;
  height?: string;
  align?: "left" | "center" | "right";
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options?: Partial<IframeNodeAttrs>) => ReturnType;
    };
  }
}

function IframeComponent(props: NodeViewProps) {
  const { node, updateAttributes, deleteNode, selected } = props;
  const attrs = (node.attrs || {}) as IframeNodeAttrs;
  const { src = "", width = "100%", align = "center" } = attrs;

  const [isEditing, setIsEditing] = useState(!src);
  const [inputUrl, setInputUrl] = useState(src || "");

  const handleSaveUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;
    const formatted = formatVideoEmbedUrl(inputUrl);
    updateAttributes({ src: formatted });
    setIsEditing(false);
  };

  const alignJustify =
    align === "left"
      ? "justify-start text-left"
      : align === "right"
      ? "justify-end text-right"
      : "justify-center text-center";

  return (
    <NodeViewWrapper className={`my-6 flex w-full ${alignJustify}`}>
      <div
        className={`relative inline-block transition-all duration-200 rounded-xl overflow-hidden ${
          selected
            ? "ring-3 ring-blue-500 shadow-xl"
            : "border border-gray-200 shadow-sm hover:shadow-md"
        }`}
        style={{ width: width || "100%", maxWidth: "100%" }}
      >
        {/* Floating Top Control Toolbar inside Editor */}
        <div className="bg-gray-900/95 text-white px-3 py-2 text-xs flex items-center justify-between gap-2 flex-wrap border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded text-[11px]">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube / Video
            </span>
            <span className="text-gray-300 text-[11px] truncate max-w-[180px] hidden sm:inline">
              {src ? src.replace("https://www.youtube.com/embed/", "ID: ") : "Belum ada link"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Edit URL Button */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium text-xs transition cursor-pointer ${
                isEditing
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
              }`}
              title="Ganti URL / Link Video"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {isEditing ? "Tutup Edit" : "Ganti Link"}
            </button>

            {/* Sizing Presets */}
            <div className="flex bg-gray-800 rounded p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => updateAttributes({ width: "50%" })}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${
                  width === "50%" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 50%"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ width: "75%" })}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${
                  width === "75%" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 75%"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ width: "100%" })}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${
                  width === "100%" || !width ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 100% (Penuh)"
              >
                100%
              </button>
            </div>

            {/* Alignment Controls */}
            <div className="flex bg-gray-800 rounded p-0.5">
              <button
                type="button"
                onClick={() => updateAttributes({ align: "left" })}
                className={`p-1 rounded transition cursor-pointer ${
                  align === "left" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Rata Kiri"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h14" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ align: "center" })}
                className={`p-1 rounded transition cursor-pointer ${
                  align === "center" || !align ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Rata Tengah"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M5 18h14" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ align: "right" })}
                className={`p-1 rounded transition cursor-pointer ${
                  align === "right" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Rata Kanan"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M10 12h10M6 18h14" />
                </svg>
              </button>
            </div>

            {/* Delete Button */}
            <button
              type="button"
              onClick={deleteNode}
              className="p-1 text-red-400 hover:bg-red-950/80 hover:text-red-300 rounded transition ml-1 cursor-pointer"
              title="Hapus Video"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Inline URL Editing Form Panel */}
        {isEditing && (
          <form onSubmit={handleSaveUrl} className="p-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Masukkan link YouTube (contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/...)"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer"
            >
              Terapkan
            </button>
          </form>
        )}

        {/* Video Player Display */}
        <div className="relative w-full aspect-video bg-gray-950">
          {src ? (
            <iframe
              src={src}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
              <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-300">Belum ada URL video yang dimasukkan</p>
              <p className="text-xs text-gray-500 mt-1">Klik tombol &ldquo;Ganti Link&rdquo; di atas untuk memasukkan tautan YouTube</p>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export const CustomIframe = Node.create({
  name: "iframe",
  group: "block",
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src") || "",
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("width") || element.style.width || "100%",
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.getAttribute("height") || "auto",
        renderHTML: (attributes) => ({
          height: attributes.height,
        }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
        }),
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: "true",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe[src]",
        getAttrs: (element) => {
          const dom = element as HTMLElement;
          return {
            src: dom.getAttribute("src") || "",
            width: dom.getAttribute("width") || dom.style.width || "100%",
            height: dom.getAttribute("height") || "auto",
            align: dom.getAttribute("data-align") || "center",
          };
        },
      },
      {
        tag: "div.iframe-wrapper",
        getAttrs: (element) => {
          const dom = element as HTMLElement;
          const iframe = dom.querySelector("iframe");
          if (!iframe) return false;
          return {
            src: iframe.getAttribute("src") || "",
            width: iframe.getAttribute("width") || iframe.style.width || "100%",
            height: iframe.getAttribute("height") || "auto",
            align: dom.getAttribute("data-align") || "center",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes["data-align"] || HTMLAttributes.align || "center";
    const width = HTMLAttributes.width || "100%";
    const alignStyle =
      align === "left"
        ? "margin-right: auto;"
        : align === "right"
        ? "margin-left: auto;"
        : "margin-left: auto; margin-right: auto;";

    return [
      "div",
      {
        class: "iframe-wrapper",
        "data-align": align,
        style: `display: flex; justify-content: ${
          align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center"
        }; width: 100%; margin: 1.5rem 0;`,
      },
      [
        "iframe",
        mergeAttributes(HTMLAttributes, {
          style: `width: ${width}; aspect-ratio: 16/9; border-radius: 12px; border: 0; max-width: 100%; ${alignStyle}`,
          allowfullscreen: "true",
          frameborder: "0",
        }),
      ],
    ];
  },

  addCommands() {
    return {
      setIframe:
        (options: Partial<IframeNodeAttrs> = {}) =>
        ({ commands }) => {
          const src = options.src ? formatVideoEmbedUrl(options.src) : "";
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...options,
              src,
            },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(IframeComponent);
  },
});
