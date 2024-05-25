import React, { useEffect, useState } from 'react';
import './Record.css';
import axios from 'axios';

const Record = () => {
    const [personalData, setPersonalData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get('https://hospital-web-app-aqvg.vercel.app/records')
            .then(res => {
                setPersonalData(res.data);
                setLoading(false); 
            })
            .catch(err => {
                console.log(err);
                setLoading(false); 
            });
    }, []);

    return (
        <div>
            <div className='body'>
                <div className="patient-record">
                    <div className="record-txt">
                        <h3>Patients Record Table</h3>
                    </div>
                    {/* <div className="search">
                        <div className="search-box">
                            <input type="text" placeholder="Search"/> 
                            <button>
                                <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div> */}
                    <div className="tables">
                        {loading ? (
                            <div className="loader"></div> 
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Contact No</th>
                                        <th>Date Added</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {personalData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.names}</td>
                                            <td>{data.age}</td>
                                            <td>{data.contact}</td>
                                            <td>{data.date_added}</td>
                                            {/* <td>
                                                <div className="btn">
                                                    <button type="submit" className='view-btn'>Download</button>
                                                    <button type="submit" className="update">Update</button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Record;




