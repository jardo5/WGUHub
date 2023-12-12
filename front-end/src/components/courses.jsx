import Grade from '@material-symbols/svg-500/outlined/grade-fill.svg?react';
import Filter from '@material-symbols/svg-500/outlined/filter_alt.svg?react';


function courses() {
    return(
        <main className="w-full h-full my-8 overflow-x-auto px-12">
            <table className="table px-12">
                {/* head */}
                <thead>
                <tr className="flex items-center justify-between">
                    <th className="p-2">Courses</th>
                    <th className="p-0 m-0 flex items-center justify-end">
                        <div className="dropdown dropdown-end p-0 m-0">
                            <div tabIndex={0} role="button" className="btn p-0 m-0 flex items-center justify-center">
                                <Filter className="h-8 w-8 fill-current inline-block p-0 m-0" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </th>
                </tr>
                </thead>

                <tbody>
                {/* row 1 */}
                <tr className=" py-2 text-black leading-[.15rem] flex flex-col justify-center items-center bg-primary">
                    <th className="font-normal">C179</th>
                    <td className="font-bold">Buisness of IT - Applications</td>
                    <td className="font-normal"><span className="underline text-info">Reviews</span> • Credits [x]</td>
                    <td className="flex flex-row">
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                    </td>
                </tr>
                <tr className=" py-2 text-black leading-[.15rem] flex flex-col justify-center items-center bg-secondary">
                    <th className="font-normal">C179</th>
                    <td className="font-bold">Buisness of IT - Applications</td>
                    <td className="font-normal"><span className="underline text-info">Reviews</span> • Credits [x]</td>
                    <td className="flex flex-row">
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                        <Grade className="h-6 w-6 fill-yellow-300" />
                    </td>
                </tr>
                </tbody>
            </table>

        </main>
    );
} 
export default courses;