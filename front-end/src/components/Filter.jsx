import FilterSVG from '@material-symbols/svg-500/outlined/filter_alt.svg?react';


function Filter(){
    return(
        <div className="dropdown dropdown-bottom dropdown-end">
            <FilterSVG tabIndex={0} role="button" className="fill-secondary h-10 w-10"></FilterSVG>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
    )
}
export default Filter;