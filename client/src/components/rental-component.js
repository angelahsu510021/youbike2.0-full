import React, { useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import axios from 'axios';


const RentalComponent = () => {
  let [rent, setRent] = useState("借車");
  let [selected,setSelected]=useState("");
  let [number, setNumber] = useState(0);
  let [data,setData]=useState([]);

  const Submit = (e) => {
    const fetchData = async () => {
      e.preventDefault();
      const {data:stationdata} =await axios.post('http://localhost:4000/rent',{ id: selected, number ,rent});
      setData([...data,stationdata])
      setSelected('');
      setNumber(0);
    };
    fetchData();
};



  return (
    <div>
      <form onSubmit={(e) => Submit(e)}>
        <Form.Group inline>
          <label>借還車</label>
          <Form.Check label="借車" checked={rent === "借車"} value="借車" onClick={() => setRent('借車')} />
          <Form.Check label="還車" checked={rent === "還車"} value="還車" onClick={() => setRent('還車')} />
        </Form.Group>
        <select value={selected} onChange={(e)=>{setSelected(e.target.value)}}>
        <option value="">請選擇借還地點</option>
        <option value="500106029">南機場夜市(中華路二段)</option>
        <option value="500106030">南海和平路口西南側</option>
        <option value="500106031">莒光和平路口</option>
        <option value="500106037">水源路11-1號旁</option>
        <option value="500106038">南門國中</option>
        <option value="500106039">捷運小南門站(2號出口)</option>
        <option value="500106040">介壽公園</option>
        <option value="500106041">中華貴陽街口</option>
        </select>
        <input type="number" placeholder="value" value={number} onChange={(e) => setNumber(e.target.value)} />
        <button type="submit" onClick={() => Submit()}>submit</button>
      </form>
      <div>
        {data.length >0 && data.map(item => {
          return(
            <div>
              <table border="1">
                <thead>
                    <tr>
                        <th colspan="2">The table</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.station}</td>
                        <td>{item.rent}</td>
                        <td>{item.number}</td>
                        <td>{item.status}</td>
                    </tr>
                </tbody>
            </table>
            </div>
          )
        })}
      </div>
    </div>
  ); 
};
export default RentalComponent;
