import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import ToolbarItem from "../components/ToolbarItem"
import { EditorState } from "draft-js"

// Mock the `setEditorState` function
const mockSetEditorState = jest.fn()

// Create a mock editor state with a style applied
const mockEditorState = EditorState.createEmpty()

describe("ToolbarItem component", () => {
  // Test 1: Should render the component correctly with given props
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

  // Test 2: Should toggle the inline style when button is clicked
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

    // Since we are mocking the setEditorState, you may mock the behavior of RichUtils.toggleInlineStyle here
    // For example, you can add a mock implementation that returns a new editorState with the 'BOLD' style.
  })

  // Test 3: Should apply the active style when the inline style is active
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
    expect(button).toHaveClass("activeStyle") // ToolbarItemActiveStyle should be applied
  })

  // Test 4: Should not apply active styles when inline style is not active
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
