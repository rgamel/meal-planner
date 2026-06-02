import { BottomAppBar } from 'components/BottomAppBar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="mx-auto h-full min-h-screen w-full max-w-md bg-gray-100">
      <div className="">
        <div className="pt-6 pb-24">
          <Outlet />
        </div>
        <BottomAppBar />
      </div>
    </div>
  )
}
