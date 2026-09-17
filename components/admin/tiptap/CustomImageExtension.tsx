"use client";

import React, { useState } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from "@tiptap/react";

export interface ImageNodeAttrs {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  align?: "left" | "center" | "right";
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options?: Partial<ImageNodeAttrs>) => ReturnType;
    };
  }
}

function ImageComponent(props: NodeViewProps) {
  const { node, updateAttributes, deleteNode, selected } = props;
  const attrs = (node.attrs || {}) as ImageNodeAttrs;
  const { src = "", alt = "", title = "", width = "100%", align = "center" } = attrs;

  const [activeTab, setActiveTab] = useState<"none" | "url" | "alt">("none");
  const [inputUrl, setInputUrl] = useState(src || "");
  const [inputAlt, setInputAlt] = useState(alt || "");

  const handleSaveUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;
    updateAttributes({ src: inputUrl.trim() });
    setActiveTab("none");
  };

  const handleSaveAlt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateAttributes({ alt: inputAlt.trim(), title: inputAlt.trim() });
    setActiveTab("none");
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
            ? "ring-3 ring-teal-500 shadow-xl"
            : "border border-gray-200 shadow-sm hover:shadow-md"
        }`}
        style={{ width: width || "100%", maxWidth: "100%" }}
      >
        {/* Floating Top Control Toolbar inside Editor */}
        <div className="bg-gray-900/95 text-white px-3 py-2 text-xs flex items-center justify-between gap-2 flex-wrap border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded text-[11px]">
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gambar
            </span>
            <span className="text-gray-300 text-[11px] truncate max-w-[160px] hidden sm:inline" title={alt || src}>
              {alt ? `Alt: "${alt}"` : "Tanpa Alt SEO"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Edit URL Button */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "url" ? "none" : "url")}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium text-xs transition cursor-pointer ${
                activeTab === "url"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
              }`}
              title="Ganti URL Gambar"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>
              {activeTab === "url" ? "Tutup" : "Ganti URL"}
            </button>

            {/* Alt SEO Text Button */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "alt" ? "none" : "alt")}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium text-xs transition cursor-pointer ${
                activeTab === "alt"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
              }`}
              title="Edit Deskripsi Alt (SEO)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Alt Text
            </button>

            {/* Sizing Presets */}
            <div className="flex bg-gray-800 rounded p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => updateAttributes({ width: "25%" })}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                  width === "25%" ? "bg-teal-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 25%"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ width: "50%" })}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                  width === "50%" ? "bg-teal-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 50%"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ width: "75%" })}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                  width === "75%" ? "bg-teal-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Ukuran 75%"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => updateAttributes({ width: "100%" })}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                  width === "100%" || !width ? "bg-teal-600 text-white font-bold" : "text-gray-400 hover:text-white"
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
                  align === "left" ? "bg-teal-600 text-white" : "text-gray-400 hover:text-white"
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
                  align === "center" || !align ? "bg-teal-600 text-white" : "text-gray-400 hover:text-white"
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
                  align === "right" ? "bg-teal-600 text-white" : "text-gray-400 hover:text-white"
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
              title="Hapus Gambar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Inline URL Editing Form Panel */}
        {activeTab === "url" && (
          <form onSubmit={handleSaveUrl} className="p-3 bg-teal-50 border-b border-teal-100 flex items-center gap-2">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Masukkan URL Gambar (https://...)"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-teal-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition cursor-pointer"
            >
              Simpan URL
            </button>
          </form>
        )}

        {/* Inline Alt Text Editing Form Panel */}
        {activeTab === "alt" && (
          <form onSubmit={handleSaveAlt} className="p-3 bg-teal-50 border-b border-teal-100 flex items-center gap-2">
            <input
              type="text"
              value={inputAlt}
              onChange={(e) => setInputAlt(e.target.value)}
              placeholder="Deskripsi Alt gambar untuk SEO & Aksesibilitas..."
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-teal-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition cursor-pointer"
            >
              Simpan Alt
            </button>
          </form>
        )}

        {/* Image Display */}
        <div className="relative w-full bg-gray-50 flex items-center justify-center min-h-[120px]">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              title={title || alt || ""}
              className="w-full h-auto object-cover max-h-[600px] block"
              loading="lazy"
            />
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p className="text-xs font-medium">Gambar belum memiliki URL</p>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export const CustomImage = Node.create({
  name: "image",
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
      alt: {
        default: "",
        parseHTML: (element) => element.getAttribute("alt") || "",
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
      title: {
        default: "",
        parseHTML: (element) => element.getAttribute("title") || "",
        renderHTML: (attributes) => ({
          title: attributes.title,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("width") || element.style.width || "100%",
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (element) => {
          const dom = element as HTMLElement;
          return {
            src: dom.getAttribute("src") || "",
            alt: dom.getAttribute("alt") || "",
            title: dom.getAttribute("title") || "",
            width: dom.getAttribute("width") || dom.style.width || "100%",
            align: dom.getAttribute("data-align") || "center",
          };
        },
      },
      {
        tag: "div.image-wrapper",
        getAttrs: (element) => {
          const dom = element as HTMLElement;
          const img = dom.querySelector("img");
          if (!img) return false;
          return {
            src: img.getAttribute("src") || "",
            alt: img.getAttribute("alt") || "",
            title: img.getAttribute("title") || "",
            width: img.getAttribute("width") || img.style.width || "100%",
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
        class: "image-wrapper",
        "data-align": align,
        style: `display: flex; justify-content: ${
          align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center"
        }; width: 100%; margin: 1.5rem 0;`,
      },
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          style: `width: ${width}; height: auto; border-radius: 10px; max-width: 100%; display: block; ${alignStyle}`,
        }),
      ],
    ];
  },

  addCommands() {
    return {
      setImage:
        (options: Partial<ImageNodeAttrs> = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
