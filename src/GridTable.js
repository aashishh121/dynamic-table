
import React, { useState, useEffect } from 'react';
import './GridTable.css'
import MockData from './MOCK_DATA.json';

function GridTable() {
    const [data, getData] = useState([]);
    const [header,setHeader] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [searchFilter, setSearchFilter] = useState("");

    const key = Object.keys(MockData[1].users[0]);

    useEffect(() => {
        setHeader(MockData[0].headers);
        getData(MockData[1].users);
    }, [])

    const sortTable = (col) =>{
        if(order ==="ASC"){
            const sortedData = [...data].sort((a,b)=>
                a[col] > b[col] ? 1 : -1
            );
            getData(sortedData);
            setOrder("DSC");
        }
        if(order ==="DSC"){
            const sortedData = [...data].sort((a,b)=>
                a[col] < b[col] ? 1 : -1
            );
            getData(sortedData);
            setOrder("ASC");
        }
        
    }

    const handleFilter = (e) =>{
      setSearchFilter(e.target.value);
    }

    return (
        <>
            <div className='title'>
                <h3>Legacies Techno Table</h3>
            </div>
            <div className='sub-main'>
                <div className='search'><input placeholder='Filter Field' onChange={handleFilter} /></div>
                <table className='table-content'>
                    <thead>
                        {/*it can added more column and row in this dynamic table through backened, no need to
                        change in User Interface */}
                        <tr>
                            {header.map((head,i)=>{
                                const objecKey = ["id","first_name","email","phone"];
                                return (
                                    <th key={head}>
                                        {head}<span className='arrow' onClick={()=>sortTable(objecKey[i])} > ↑↓</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                    {data.filter(val=>{
                        if(searchFilter === ''){
                            return val
                        }else if(val.email.includes(searchFilter) || val.first_name.toLowerCase().includes(searchFilter.toLowerCase())
                        || val.last_name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || val.phone.includes(searchFilter)
                        ){
                            return val;
                        }
                    }).map((item, i) => {
                        return (
                            <tr key={i}>
                                {
                                    key.map((val)=>{
                                        if(val==="first_name"){
                                            return (
                                                <td>{item[val] + " " + item.last_name}</td>
                                            )
                                        }else if(val!=="last_name"){
                                            return (
                                                <td>{item[val]}</td>
                                            )   
                                        }
                                    })
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default GridTable;