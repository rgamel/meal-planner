export function PageTitle({ children }: { children: string | JSX.Element | (string | JSX.Element)[] }) {
  return (
    <div className="flex items-center justify-center">
      <h2 className="text-2xl font-bold tracking-wide uppercase">{children}</h2>
    </div>
  )
}
