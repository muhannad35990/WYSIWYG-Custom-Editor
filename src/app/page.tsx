"use client"
import { useState } from "react"
import CustomEditor from "../components/CustomEditor"
import { ContentState, convertFromHTML, EditorState } from "draft-js"

export default function Home() {
  var overview = "<u>this is my text in Controlled mode</u>"
  const blocksFromHTML = convertFromHTML(overview)
  const contentDataState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState)

  const onEditorStateChange = (editorStateData: EditorState) => {
    setEditorState(editorStateData)
  }
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
    </div>
  )
}
