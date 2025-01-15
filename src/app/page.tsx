import CustomEditor from "../components/CustomEditor"

export default function Home() {
  return (
    <div className="w-4/5 m-10">
      <CustomEditor
        toolbarItemStyle="bg-blue-300"
        toolbarItemActiveStyle="bg-red-300"
      />
    </div>
  )
}
