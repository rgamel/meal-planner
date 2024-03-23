export function PageTitle({ children }: { children: string | JSX.Element | (string | JSX.Element)[] }) {
    return (
        <div className="flex items-center justify-center text-gray-900">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{children}</h2>
        </div>
    );
}
