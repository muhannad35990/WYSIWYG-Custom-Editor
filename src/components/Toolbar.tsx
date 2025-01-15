import { FC, ReactElement } from "react"
import { ToolbarItemType, ToolbarType } from "../../types"
import ToolbarItem from "./ToolbarItem"
import { cn } from "@/lib/util"

const Toolbar: FC<ToolbarType> = ({
  toolBarItems,
  editorState,
  setEditorState,
  extendToolBar,
  toolbarStyle,
  toolbarItemStyle,
  toolbarItemActiveStyle
}): ReactElement => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-slate-200 py-1 px-2 rounded-t-lg shadow",
        toolbarStyle
      )}
    >
      {(extendToolBar
        ? [...toolBarItems, ...extendToolBar]
        : toolBarItems
      )?.map((item: ToolbarItemType, index: number) => (
        <ToolbarItem
          {...item}
          key={index}
          editorState={editorState}
          setEditorState={setEditorState}
          toolbarItemStyle={toolbarItemStyle}
          toolbarItemActiveStyle={toolbarItemActiveStyle}
        />
      ))}
    </div>
  )
}

export default Toolbar
