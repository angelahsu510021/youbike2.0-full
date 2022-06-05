import React, { useState, useEffect } from "react";
import axios from 'axios';
const StationComponent = () => {
  let [data, setData] = useState([]);
  let [value, setValue] = useState("");
  let [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:4000/total');
      setData(data);
      setFilterData(data);
    };
    fetchData();
  }, []);
  const filter = () => {
    setFilterData(data.filter(item => item['name'].includes(value)));
  };


  return (
    <div>
        <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit" onClick={() => filter()} >submit</button>
        <ul>
            {filterData.length > 0 && filterData.map(station => (<li>{station.name}</li>))}
        </ul>
    </div>
    
  );
};
export default StationComponent;