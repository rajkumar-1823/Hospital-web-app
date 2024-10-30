import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Record.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Record = () => {
    const [personalData, setPersonalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error messages

    

    useEffect(() => {
        axios.get('http://hospital-web-app-aqvg.vercel.app/records')
            .then(res => {
                setPersonalData(res.data);
                setLoading(false);
                setError(null); // Reset error state on success
            })
            .catch(err => {
                console.error(err);
                setError('An error occurred while fetching the data.');
                setLoading(false);
            });
    }, [personalData]);

    const handleDeleteRecord = (id) =>{
        const isConfirmed = window.confirm("Are you sure you want to delete the record?");
        if(isConfirmed){
            axios.delete(`http://hospital-web-app-aqvg.vercel.app/deleterecords/${id}`)
            .then(res=>{
                toast.success("Record Deleted Successfully", {
                    position: "top-center"
                  });
            })
            .catch(err => {
                toast.error(err, {
                    position: "top-center"
                  });
            });
        }
    }

    const handleEdit = () =>{
        toast.error("Coming Soon...")
    }

    return (
        <div>
            <div className='body'>
            <ToastContainer />
                <div className="patient-record">
                    <div className="record-txt">
                        <h3>Patients Record Table</h3>
                    </div>
                    <div className="tables">
                        {loading ? (
                            <div className="loader"></div> // Loading spinner or animation
                        ) : error ? (
                            <div className="error">{error}</div> // Display error message
                        ) : personalData.length === 0 ? (
                            <div className="no-records">No records found.</div> // Display message when no records are found
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Contact No</th>
                                        <th>Date Added</th>
                                        <th>Action</th>
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
                                            <td>
                                                <div className='action'>
                                                <button className='btn-del' title='Delete' onClick={()=>handleDeleteRecord(data.id)} ><FontAwesomeIcon className='icon-del' icon={faTrash} /></button>
                                                <button className='btn-del' title='Edit' onClick={handleEdit} ><FontAwesomeIcon className='icon-edit' icon={faPenToSquare} /></button>
                                                </div>
                                            </td>
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
