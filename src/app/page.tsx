"use client"
import { useState } from "react"
import CustomEditor from "../components/CustomEditor"
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState
} from "draft-js"

export default function Home() {
  var overview = "<u>this is my text in Controlled mode</u>"
  const blocksFromHTML = convertFromHTML(overview)
  const contentDataState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState)
  const [savedState, setSavedState] = useState("")

  const onEditorStateChange = (editorStateData: EditorState) => {
    setEditorState(editorStateData)
  }
  console.log(
    "editor stat",
    JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  )

  const GenerateRandomContent = () => {
    var random =
      "<p>Lorem ipsum is a <b>dummy</b> or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout/p>"
    const blocksFromHTML = convertFromHTML(random)
    const contentDataState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    const editorDataState = EditorState.createWithContent(contentDataState)
    setEditorState(editorDataState)
  }

  const sendToApi = async () => {
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )
    setSavedState(content)
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: content
    })

    setEditorState(EditorState.createEmpty())
  }

  const LoadContentFromApi = async () => {
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )
    setSavedState(content)
    const response = await fetch("/api/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const newState: ContentState = convertFromRaw(JSON.parse(savedState))
    setEditorState(EditorState.createWithContent(newState))
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
