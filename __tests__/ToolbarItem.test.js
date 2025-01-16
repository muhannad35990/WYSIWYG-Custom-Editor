import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import ToolbarItem from "../src/components/ToolbarItem"
import { EditorState } from "draft-js"

// Mock the `setEditorState` function
const mockSetEditorState = jest.fn()

// Create a mock editor state with a style applied
const mockEditorState = EditorState.createEmpty()

describe("ToolbarItem component", () => {
  it("should render the button with the given label", () => {
    render(
      <ToolbarItem
        label="Bold"
        style="BOLD"
        editorState={mockEditorState}
        setEditorState={mockSetEditorState}
        toolbarItemStyle="customStyle"
        toolbarItemActiveStyle="activeStyle"
      />
    )
    expect(screen.getByText("Bold")).toBeInTheDocument()
  })

  it("should toggle inline style on button click", () => {
    render(
      <ToolbarItem
        label="Bold"
        style="BOLD"
        editorState={mockEditorState}
        setEditorState={mockSetEditorState}
        toolbarItemStyle="customStyle"
        toolbarItemActiveStyle="activeStyle"
      />
    )

    // Initially, the editorState doesn't have the 'BOLD' style
    fireEvent.click(screen.getByText("Bold"))

    // Check if setEditorState was called with the updated editorState
    expect(mockSetEditorState).toHaveBeenCalled()
  })

  it("should apply active styles when inline style is active", () => {
    // Create an editor state with the 'BOLD' style applied
    const activeEditorState = EditorState.createWithContent(
      mockEditorState.getCurrentContent(),
      mockEditorState.getDecorator()
    )

    // Simulate an editorState that already has the style
    activeEditorState.getCurrentInlineStyle().add("BOLD")

    render(
      <ToolbarItem
        label="Bold"
        style="BOLD"
        editorState={activeEditorState}
        setEditorState={mockSetEditorState}
        toolbarItemStyle="customStyle"
        toolbarItemActiveStyle="activeStyle"
      />
    )

    const button = screen.getByText("Bold")

    // Check if button has the active class applied
    expect(button).toHaveClass("bg-fuchsia-500 text-white")
    expect(button).toHaveClass("activeStyle")
  })

  it("should not apply active styles when inline style is not active", () => {
    render(
      <ToolbarItem
        label="Bold"
        style="BOLD"
        editorState={mockEditorState}
        setEditorState={mockSetEditorState}
        toolbarItemStyle="customStyle"
        toolbarItemActiveStyle="activeStyle"
      />
    )

    const button = screen.getByText("Bold")

    // Check that the button does not have the active class
    expect(button).not.toHaveClass("bg-fuchsia-500 text-white")
    expect(button).not.toHaveClass("activeStyle")
  })
})
