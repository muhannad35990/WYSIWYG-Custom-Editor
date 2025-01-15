"use client"
import { FC, ReactElement, useEffect } from "react"
import { useState } from "react"
import { Editor, EditorState } from "draft-js"
import "draft-js/dist/Draft.css"
import Toolbar from "./Toolbar"
import toolbarItems from "./toolbatItems"
import { CustomEditorProps } from "../../types"
import { cn } from "@/lib/util"

const CustomEditor: FC<CustomEditorProps> = ({
  renderToolbar,
  extendToolBar,
  style,
  toolbarStyle,
  toolbarItemStyle,
  toolbarItemActiveStyle,
  value,
  onChange
}): ReactElement => {
  const [editorState, setEditorState] = useState<EditorState>(
    () => value ?? EditorState.createEmpty()
  )
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  useEffect(() => {
    if (onChange) onChange(editorState)
  }, [editorState])

  return (
    <div>
      {renderToolbar ? (
        renderToolbar
      ) : (
        <Toolbar
          toolBarItems={toolbarItems}
          editorState={editorState}
          setEditorState={setEditorState}
          extendToolBar={extendToolBar}
          toolbarStyle={toolbarStyle}
          toolbarItemStyle={toolbarItemStyle}
          toolbarItemActiveStyle={toolbarItemActiveStyle}
        />
      )}

      {editorLoaded ? (
        <div
          className={cn(
            "border border-t-0 border-slate-200 cursor-text min-h-20",
            style
          )}
        >
          <Editor
            editorState={editorState}
            onChange={(e: any) => setEditorState(e)}
          />
        </div>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  )
}

export default CustomEditor
