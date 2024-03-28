import { Outlet } from 'react-router-dom';
import { BottomAppBar } from 'components/BottomAppBar';

export default function App() {
    return (
        <div className="mx-auto h-full min-h-screen w-full max-w-md bg-gray-100">
            <div className="">
                {/* <Header /> */}
                <div className="pb-24 pt-6">
                    <Outlet />
                </div>
                <BottomAppBar />
            </div>
        </div>
    );
}

// function Header() {
//     return (
//         <div>
//             <div className="left-0 top-0 flex w-full flex-row bg-gray-200 px-10 py-1">
//                 <input type="text" placeholder="Search" className="w-full rounded-full pl-6 pr-20 text-lg" />
//                 <span className="-ml-14">
//                     <AuthButton />
//                 </span>
//             </div>
//         </div>
//     );
// }
