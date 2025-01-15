import { FC, ReactElement } from "react"
import { ToolbarItemProps } from "../../types"
import { RichUtils } from "draft-js"
import { cn } from "@/lib/util"

const ToolbarItem: FC<ToolbarItemProps> = ({
  label,
  style,
  editorState,
  setEditorState,
  toolbarItemStyle,
  toolbarItemActiveStyle
}): ReactElement => {
  const onCommandClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }
  const isActive = () => {
    const currentStyle = editorState.getCurrentInlineStyle()
    return currentStyle.has(style)
  }
  return (
    <button
      type="button"
      onClick={onCommandClick}
      className={cn(
        `font-bold w-9 rounded ${isActive() && "bg-fuchsia-500 text-white"}`,
        toolbarItemStyle,
        isActive() && toolbarItemActiveStyle
      )}
    >
      {label}
    </button>
  )
}

export default ToolbarItem
