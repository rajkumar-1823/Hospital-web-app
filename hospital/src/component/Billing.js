import React, { useState, useEffect } from 'react';
import './Billing.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Billing = () => {
    const [data, setData] = useState({});
    const [id, setId] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [item, setItem] = useState('');
    const [rate, setRate] = useState('');
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [paymentType, setPaymentType] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
        setCurrentDateTime(`${formattedDate} ${formattedTime}`);
    }, []);

    const handleId = () => {
        axios.get(`https://hospital-web-app-aqvg.vercel.app/bill?id=${id}`)
            .then(res => {
                setData(res.data[0]);
                setDisabled(true);
            })
            .catch(err => console.log(err));
    };

    const handleItems = () => {
        const newItem = { item, rate: parseFloat(rate) };
        setItems([...items, newItem]);
        setTotal(total + parseFloat(rate));
        setItem('');
        setRate('');
    };

    const PrintBill = () => {
        window.print();
        navigate('/')
    };

    return (
        <div>
            <div className='bills'>
                <form onSubmit={(e) => { e.preventDefault(); handleId(); }}>
                    <h3>PID</h3>
                    <input
                        placeholder='Enter PID'
                        required
                        disabled={disabled}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Next</button>
                </form>
            </div>
            <div className='bills-item'>
                <form onSubmit={(e) => { e.preventDefault(); handleItems(); }}>
                    <h3>Enter Item Details</h3>
                    <input
                        placeholder='Enter Particulars'
                        required
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <input
                        type='number'
                        placeholder='Enter Rate'
                        required
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
            <div className='bills-payment'>
                <h3>Select Payment Type</h3>
                <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                    <option value="">Select Payment Type</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                </select>
            </div>
            <div className='body5'>
                <div className="bill-body">
                    <div className="head">
                        <h2>SRI KRISHNA CLINIC</h2>
                        <h4>95A, Ettayapuram Road, Kovilpatti-628501</h4>
                        <h4>Phone: 6383739884</h4>
                        <h5>Email: kovilpattikidneycentre@gmail.com</h5>
                    </div>
                    <div className="bill-cum-res">
                        <h4>Bill Cum Receipt</h4>
                        <div className="main-val">
                            <div className="det1">
                                {/* <h3>OP No: 25</h3> */}
                                <h3>Date: {currentDateTime}</h3>
                            </div>
                            <div className="det2">
                                {/* <h3>Bill No: </h3> */}
                            </div>
                        </div>
                    </div>
                    <div className="pat-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.names}</td>
                                    <td>{data.id}</td>
                                    <td>{data.age}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.contact}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-type">
                        <h3>Payment Type: {paymentType}</h3>
                    </div>
                    <div className="inv-detail">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.item}</td>
                                        <td>{item.rate.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="overall-amt">
                        <div className="fin">
                            <h3>Amount Received: {total.toFixed(2)}</h3>
                            <h3>Authorised Signature</h3>
                        </div>
                    </div>
                </div>
                <div className="sub-btn">
                    <button onClick={PrintBill}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default Billing;
