/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useEffect, useState } from "react"
import useEditor from "@/components/particles/hooks/useEditor"
import CustomButton from "../atoms/CustomButton"
import CustomEditor from "../molecules/CustomEditor"

export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    editorState,
    LoadContentFromApi,
    sendToApi,
    GenerateRandomContent,
    onEditorStateChange
  } = useEditor()

  useEffect(() => {
    setIsLoading(false)
    return () => {
      setIsLoading(true)
    }
  }, [])

  if (isLoading) return <div>Loading ...</div>

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
        <CustomButton
          title="Generate Random Content"
          onClick={GenerateRandomContent}
        />
        <CustomButton title="Send to API" onClick={sendToApi} />
        <CustomButton title="Load from API" onClick={LoadContentFromApi} />
      </div>
    </div>
  )
}
