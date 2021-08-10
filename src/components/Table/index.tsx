import * as React from "react";
import _ from 'lodash';
import { FilterIcon } from "../Icons"
import TableFilterTooltip  from "./TableFilterTooltip";
import { IData } from "../../models/data";

interface ITableProps {
  data: IData[];
  columnKeys: any[];
}

const Table = ( {data, columnKeys}: ITableProps ) =>{
  const [currentData, setCurrentData] = React.useState<IData[]>([]);
  const [filter, setFilter] = React.useState<boolean>(false);
  const [filterType, setFilterType] = React.useState<any>('');
  const [currentColumn, setCurrentColumn] = React.useState<any>('');
  const [xPos, setXPos] = React.useState<number>(0);
  const [yPos, setYPos] = React.useState<number>(0);
  const [isHide, setIsHide] = React.useState<any>(false);
  const [hiddenColumns, setHiddenColumns] = React.useState<any[]>([]);

  // useEffect is for set current data.
  React.useEffect(() => setCurrentData([...data]), [data]);

  React.useEffect(() => {
    if( filterType === 'unsort' ) {
      setCurrentData([...data])
    } else if (filterType === 'hide') {
      setHiddenColumns((prevHiddenColumns: any) => [...prevHiddenColumns, currentColumn]);
    }
    else {
      const ordered = _.orderBy(currentData, [currentColumn], [filterType]);
      setCurrentData([...ordered])
    }
  } , [filterType, isHide]);
  
  const handleFilter = (e: any) =>  {
    e.target.dataset.type === 'hide' && setIsHide(!isHide);
    setFilterType(e.target.dataset.type);
    setFilter(false);
  }

  // check if column is hidden
  const isHidden = (target : number) => hiddenColumns.find((column: number) => column === target);

  const renderFilterColumn = (type : String) => {

    const filterClick = (e: any) => {
      e.stopPropagation();
      !filter && setFilter(true);
      setXPos(e.clientX - 150);
      setYPos(e.clientY + 20);
      setCurrentColumn(type);
    }

    return (
      <div className="relative">
        <button className="ml-4" onClick={filterClick}>
          <FilterIcon size={18}/>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columnKeys?.map( (key, index) => (
                    !isHidden(key) && <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        {key}
                        {renderFilterColumn(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData?.map((dataItem : any, index : number) => (
                  <tr key={index}>
                    {columnKeys?.map( (key, keyIndex) => (
                      !isHidden(key) && <td key={keyIndex}className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">{dataItem[key]}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {filter && <TableFilterTooltip handleFilter={handleFilter} xPos={xPos} yPos={yPos} />}
    </div>
  )
}

export default Table;