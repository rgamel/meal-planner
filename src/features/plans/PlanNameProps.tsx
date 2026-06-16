import { PageTitle } from 'components/PageTitle'

type PlanNameProps = {
  editingName: boolean
  planName: string
  onInputChange(e: { target: { value: string } }): void
}

export function PlanName({ editingName, planName, onInputChange }: PlanNameProps) {
  if (!editingName) {
    return (
      <PageTitle>
        <span className="align-middle">{planName}</span>
      </PageTitle>
    )
  }
  return (
    <input
      className="block w-full rounded-lg py-2 pr-20 pl-6 text-lg ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-blue-600 focus:ring-inset"
      value={planName}
      onChange={onInputChange}
    />
  )
}
