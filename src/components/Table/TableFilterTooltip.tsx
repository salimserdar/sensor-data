import React, {useRef} from 'react';
type TableFilterTooltipProps = {
    handleFilter: Function,
    xPos: number,
    yPos: number
}

const TableFilterTooltip = ( {handleFilter, xPos, yPos} : TableFilterTooltipProps ) => {
    return (
        <ul className="absolute top-8 right-0 p-4 bg-gray-50 w-40 shadow-lg rounded-xl" style={{position: 'absolute', top: yPos, left: xPos}}>
            <li data-type="unsort" onClick={(e) => handleFilter(e)}className="cursor-pointer text-right pb-2">Unsort</li>
            <li data-type="asc" onClick={(e) => handleFilter(e)}className="cursor-pointer text-right pb-2">Sort by ASC</li>
            <li data-type="desc" onClick={(e) => handleFilter(e)}className="cursor-pointer text-right pb-2">Sort by DESC</li>
            <li data-type="hide" onClick={(e) => handleFilter(e)}className="cursor-pointer text-right">Hide</li>
        </ul>
    )
}

export default TableFilterTooltip;