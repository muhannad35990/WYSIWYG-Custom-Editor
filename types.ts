import { EditorState } from "draft-js"
import { ReactElement } from "react"

export interface ToolbarItemProps {
  label: string
  style: string
  toolbarItemStyle?: string
  toolbarItemActiveStyle?: string
  editorState: EditorState
  setEditorState: (v: EditorState) => void
}
export interface ToolbarItemType {
  label: string
  style: string
}

export interface ToolbarType {
  toolBarItems: ToolbarItemType[]
  editorState: EditorState
  extendToolBar?: ToolbarItemType[]
  toolbarStyle?: string
  toolbarItemStyle?: string
  toolbarItemActiveStyle?: string
  setEditorState: (v: EditorState) => void
}

export interface CustomEditorProps {
  renderToolbar?: ReactElement
  extendToolBar?: ToolbarItemType[]
  style?: string
  toolbarStyle?: string
  toolbarItemStyle?: string
  toolbarItemActiveStyle?: string
  value?: EditorState
  onChange?: (v: EditorState) => void
}
