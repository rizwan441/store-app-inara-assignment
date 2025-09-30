import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded">
      {/* Toolbar */}
    <div className="flex gap-2 border-b p-2 bg-gray-100">
  <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1">B</button>
  <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 italic">I</button>
  <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 underline">U</button>

  <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1">• List</button>
  <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1">1. List</button>

  <button
    type="button"
    onClick={() => {
      const url = prompt("Enter URL");
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }}
    className="px-2 py-1 text-blue-600"
  >
    Link
  </button>
</div>


      {/* Editor */}
      <div className="p-2 min-h-[120px] tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
