import { AuthButton } from 'components/AuthButton'
import { PageTitle } from 'components/PageTitle'

export function Home() {
  return (
    <section className="pt-20 text-center">
      <PageTitle>Grocery Planner</PageTitle>
      <div className="m-8 rounded-sm border-1 border-t-4 border-b-4 border-t-gray-100 border-b-gray-300 bg-gray-200 p-20">
        <AuthButton />
      </div>
    </section>
  )
}
