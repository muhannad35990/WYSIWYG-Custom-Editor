/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState
} from "draft-js"
import { useState } from "react"

const useEditor = () => {
  const overview = "<u>this is my text in Controlled mode</u>"
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

  const GenerateRandomContent = () => {
    const random =
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
  return {
    editorState,
    LoadContentFromApi,
    sendToApi,
    GenerateRandomContent,
    onEditorStateChange
  }
}
export default useEditor
