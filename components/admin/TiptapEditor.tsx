"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { TextStyle } from "@tiptap/extension-text-style";
import { ListItem } from "@tiptap/extension-list";
import { Dropcursor, Gapcursor, Placeholder, TrailingNode } from "@tiptap/extensions";

import { RichTextProvider } from "reactjs-tiptap-editor";
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic";
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading";
import { TextUnderline, RichTextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Strike, RichTextStrike } from "reactjs-tiptap-editor/strike";
import { BulletList, RichTextBulletList } from "reactjs-tiptap-editor/bulletlist";
import { OrderedList, RichTextOrderedList } from "reactjs-tiptap-editor/orderedlist";
import { Blockquote, RichTextBlockquote } from "reactjs-tiptap-editor/blockquote";
import { HorizontalRule, RichTextHorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Link, RichTextLink } from "reactjs-tiptap-editor/link";
import { Table, RichTextTable } from "reactjs-tiptap-editor/table";
import { TextAlign, RichTextAlign } from "reactjs-tiptap-editor/textalign";
import { Color, RichTextColor } from "reactjs-tiptap-editor/color";
import { Highlight, RichTextHighlight } from "reactjs-tiptap-editor/highlight";
import { Code, RichTextCode } from "reactjs-tiptap-editor/code";
import { CodeBlock, RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock";
import { Video, RichTextVideo } from "reactjs-tiptap-editor/video";
import { Clear, RichTextClear } from "reactjs-tiptap-editor/clear";
import { History, RichTextUndo, RichTextRedo } from "reactjs-tiptap-editor/history";

// Custom visual-editable extensions for Image and YouTube/Iframe
import { CustomIframe } from "./tiptap/CustomIframeExtension";
import { CustomImage } from "./tiptap/CustomImageExtension";

// Bubble Menus untuk edit elemen langsung saat diklik (Link, Table, Video)
import {
  RichTextBubbleVideo,
  RichTextBubbleLink,
  RichTextBubbleTable,
} from "reactjs-tiptap-editor/bubble";

import "reactjs-tiptap-editor/style.css";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Tulis isi artikel di sini...",
}: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageForm, setImageForm] = useState({ src: "", alt: "", width: "100%", align: "center" });

  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeForm, setYoutubeForm] = useState({ src: "", width: "100%", align: "center" });

  useEffect(() => { setMounted(true); }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      ListItem,
      Dropcursor.configure({
        color: "#0077b6",
        width: 2,
      }),
      Gapcursor,
      TrailingNode,
      Placeholder.configure({
        placeholder,
      }),
      History,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Bold,
      Italic,
      TextUnderline,
      Strike,
      Color,
      Highlight,
      BulletList,
      OrderedList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      HorizontalRule,
      Link.configure({
        openOnClick: false,
      }),
      CustomImage,
      CustomIframe,
      Video.configure({
        upload: (file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        },
      }),
      Table,
      Code,
      CodeBlock,
      Clear,
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  // Sinkronisasi nilai luar jika berubah (misal ganti artikel yang diedit)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg text-gray-500 bg-gray-50 animate-pulse">
        Memuat editor artikel...
      </div>
    );
  }

  return (
    <div className="tiptap-custom-container border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
      <RichTextProvider editor={editor}>
        {/* Toolbar Header */}
        <div className="tiptap-toolbar flex items-center gap-1.5 flex-wrap p-3 bg-gray-50/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
          <RichTextUndo />
          <RichTextRedo />
          <div className="h-4 w-px bg-gray-300 mx-1" />
          <RichTextHeading />
          <RichTextBold />
          <RichTextItalic />
          <RichTextUnderline />
          <RichTextStrike />
          <RichTextColor />
          <RichTextHighlight />
          <div className="h-4 w-px bg-gray-300 mx-1" />
          <RichTextBulletList />
          <RichTextOrderedList />
          <RichTextAlign />
          <div className="h-4 w-px bg-gray-300 mx-1" />
          <RichTextBlockquote />
          <RichTextHorizontalRule />
          <RichTextCode />
          <RichTextCodeBlock />
          <RichTextTable />
          <div className="h-4 w-px bg-gray-300 mx-1" />
          <RichTextLink />

          {/* Quick Insert Gambar */}
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            title="Sisipkan Gambar"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30, borderRadius: 6, border: "none",
              background: "transparent", cursor: "pointer", color: "#374151", flexShrink: 0,
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseOut={e => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>

          {/* Quick Insert YouTube */}
          <button
            type="button"
            onClick={() => setShowYoutubeModal(true)}
            title="Sisipkan Video YouTube"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30, borderRadius: 6, border: "none",
              background: "transparent", cursor: "pointer", color: "#374151", flexShrink: 0,
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseOut={e => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>

          <RichTextVideo />
          <RichTextClear />
        </div>

        {/* Floating Bubble Toolbar for Links, Tables, and uploaded Videos */}
        <RichTextBubbleVideo />
        <RichTextBubbleLink />
        <RichTextBubbleTable />

        {/* Editor Writing Area */}
        <div className="p-5 min-h-[400px] max-h-[750px] overflow-y-auto prose prose-teal max-w-none focus:outline-none">
          <EditorContent editor={editor} />
        </div>
      </RichTextProvider>

      {/* Modal Image - rendered via Portal to escape overflow:hidden */}
      {mounted && showImageModal && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", padding: 16 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowImageModal(false); }}
        >
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: 420, maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>Sisipkan Gambar</span>
              </div>
              <button onClick={() => setShowImageModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9ca3af", lineHeight: 1, padding: "2px 6px" }}>&times;</button>
            </div>
            {/* Body */}
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>URL Gambar <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="url" autoFocus value={imageForm.src}
                  onChange={e => setImageForm({...imageForm, src: e.target.value})}
                  onKeyDown={e => { if (e.key === "Enter" && imageForm.src) { editor.commands.insertContent({ type: "image", attrs: imageForm }); setShowImageModal(false); setImageForm({ src: "", alt: "", width: "100%", align: "center" }); }}}
                  style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Alt Text (SEO)</label>
                <input
                  type="text" value={imageForm.alt}
                  onChange={e => setImageForm({...imageForm, alt: e.target.value})}
                  style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  placeholder="Deskripsi gambar..."
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Ukuran</label>
                  <select value={imageForm.width} onChange={e => setImageForm({...imageForm, width: e.target.value})} style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff" }}>
                    <option value="100%">Penuh (100%)</option>
                    <option value="75%">Besar (75%)</option>
                    <option value="50%">Sedang (50%)</option>
                    <option value="25%">Kecil (25%)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Posisi</label>
                  <select value={imageForm.align} onChange={e => setImageForm({...imageForm, align: e.target.value})} style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff" }}>
                    <option value="center">Tengah</option>
                    <option value="left">Kiri</option>
                    <option value="right">Kanan</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div style={{ padding: "10px 16px", borderTop: "1px solid #f0f0f0", background: "#f9fafb", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setShowImageModal(false)} style={{ padding: "7px 14px", fontSize: 13, fontWeight: 500, color: "#4b5563", background: "none", border: "1px solid #d1d5db", borderRadius: 6, cursor: "pointer" }}>Batal</button>
              <button
                disabled={!imageForm.src}
                onClick={() => { editor.commands.insertContent({ type: "image", attrs: imageForm }); setShowImageModal(false); setImageForm({ src: "", alt: "", width: "100%", align: "center" }); }}
                style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, color: "#fff", background: imageForm.src ? "#0d9488" : "#99d6d1", border: "none", borderRadius: 6, cursor: imageForm.src ? "pointer" : "not-allowed" }}
              >Sisipkan</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal YouTube - rendered via Portal to escape overflow:hidden */}
      {mounted && showYoutubeModal && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", padding: 16 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowYoutubeModal(false); }}
        >
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: 420, maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>Sisipkan Video YouTube</span>
              </div>
              <button onClick={() => setShowYoutubeModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9ca3af", lineHeight: 1, padding: "2px 6px" }}>&times;</button>
            </div>
            {/* Body */}
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>URL Video YouTube <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="text" autoFocus value={youtubeForm.src}
                  onChange={e => setYoutubeForm({...youtubeForm, src: e.target.value})}
                  onKeyDown={e => { if (e.key === "Enter" && youtubeForm.src) { editor.commands.insertContent({ type: "iframe", attrs: youtubeForm }); setShowYoutubeModal(false); setYoutubeForm({ src: "", width: "100%", align: "center" }); }}}
                  style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Paste URL biasa, youtu.be/... atau embed URL</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Ukuran</label>
                  <select value={youtubeForm.width} onChange={e => setYoutubeForm({...youtubeForm, width: e.target.value})} style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff" }}>
                    <option value="100%">Penuh (100%)</option>
                    <option value="75%">Besar (75%)</option>
                    <option value="50%">Sedang (50%)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Posisi</label>
                  <select value={youtubeForm.align} onChange={e => setYoutubeForm({...youtubeForm, align: e.target.value})} style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff" }}>
                    <option value="center">Tengah</option>
                    <option value="left">Kiri</option>
                    <option value="right">Kanan</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div style={{ padding: "10px 16px", borderTop: "1px solid #f0f0f0", background: "#f9fafb", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setShowYoutubeModal(false)} style={{ padding: "7px 14px", fontSize: 13, fontWeight: 500, color: "#4b5563", background: "none", border: "1px solid #d1d5db", borderRadius: 6, cursor: "pointer" }}>Batal</button>
              <button
                disabled={!youtubeForm.src}
                onClick={() => { editor.commands.insertContent({ type: "iframe", attrs: youtubeForm }); setShowYoutubeModal(false); setYoutubeForm({ src: "", width: "100%", align: "center" }); }}
                style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, color: "#fff", background: youtubeForm.src ? "#dc2626" : "#fca5a5", border: "none", borderRadius: 6, cursor: youtubeForm.src ? "pointer" : "not-allowed" }}
              >Sisipkan</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
