export function PageTitle({ label }: { label: string }) {
    return (
        <div className="flex justify-center text-gray-900">
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">{label}</h2>
        </div>
    );
}
