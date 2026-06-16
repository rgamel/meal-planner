import { BottomAppBar } from 'components/BottomAppBar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="mx-auto h-full w-full max-w-sm">
      <div className="text-gray-600">
        <div className="pt-6 pb-24">
          <Outlet />
        </div>
        <BottomAppBar />
      </div>
    </div>
  )
}
