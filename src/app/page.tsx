/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import CustomEditor from "../components/CustomEditor"
import useEditor from "@/hooks/useEditor"

export default function Home() {
  const {
    editorState,
    LoadContentFromApi,
    sendToApi,
    GenerateRandomContent,
    onEditorStateChange
  } = useEditor()
  return (
    <div className="w-4/5 m-10">
      <h2 className="font-bold text-blue-600 mb-4 underline text-lg">
        Uncontrolled mode
      </h2>
      <CustomEditor />
      <h2 className="font-bold text-red-600 mb-4 mt-8  underline text-lg">
        Controlled mode
      </h2>

      <CustomEditor
        value={editorState}
        onChange={onEditorStateChange}
        style="border-2 border-red-600 border-top-0"
        toolbarStyle="bg-red-200"
        toolbarItemStyle=""
        toolbarItemActiveStyle="bg-red-700"
        extendToolBar={[{ label: "LT", style: "STRIKETHROUGH" }]}
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={GenerateRandomContent}
          className="bg-blue-400 text-white p-1 rounded"
        >
          Generate Random Content
        </button>
        <button
          type="button"
          onClick={sendToApi}
          className="bg-blue-400 text-white p-1 rounded"
        >
          Send to API
        </button>
        <button
          type="button"
          onClick={LoadContentFromApi}
          className="bg-blue-400 text-white p-1 rounded"
        >
          Load from API
        </button>
      </div>
    </div>
  )
}
