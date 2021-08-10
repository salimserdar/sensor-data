import * as React from "react";
import './App.css';
import Table from './components/Table';
import { mergeJSON } from './utils/';

function App() {
  const [data, setData] = React.useState<any>([]);
  
  React.useEffect(() => {
    const mergedData = mergeJSON();
    setData([...mergedData]);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="pt-16">
        <Table data={data} columnKeys={['name', 'type', 'units', 'value', 'time']}/>
      </div>
    </div>
  )
}

export default App;
