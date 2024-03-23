import { useNavigate } from 'react-router-dom';

export function BottomAppBar() {
    const nav = useNavigate();
    const links = [
        { value: '/', label: 'Home' },
        { value: '/plans', label: 'Plans' },
        { value: '/recipes', label: 'Recipes' },
        { value: '/groceries', label: 'Groceries' },
    ];

    return (
        <div className="fixed bottom-0 left-0 z-40 flex h-12 w-full bg-blue-500">
            <div className="flex w-4/5 items-center justify-around font-semibold text-white">
                {links.map((link) => (
                    <a className="py-1" key={link.value} onClick={() => nav(link.value)}>
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
