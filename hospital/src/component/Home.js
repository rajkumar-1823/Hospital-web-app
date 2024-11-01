import React  from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressCard} from '@fortawesome/free-regular-svg-icons'
import {faFile} from '@fortawesome/free-regular-svg-icons'
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import {faPrescriptionBottleMedical} from '@fortawesome/free-solid-svg-icons'

// import { faUpload } from '@fortawesome/free-solid-svg-icons'

const Home = () => { 
    
    // const [auth, setAuth] = useState(false);
    // const msg = "Please Login";

    // useEffect(() => {
    //     axios.get('https://hospital-web-app-aqvg.vercel.app/protected') // Endpoint to check authentication status
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 // setAuth(true); 
    //             } else {
    //                 console.log(res.data.Message);
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);


    const navigate = useNavigate()


    const handlePatient = () => {
        // if (auth) {
            navigate('/formsz');
        // } else {
        //     toast.error(msg);
        // }
    }
    
    const handleView=()=>{
        // if(auth){
            navigate('/records')
        // }else{
        //     toast.error(msg)
        // }
    }
    const handleBilling=()=>{
        // if(auth){
            navigate('/billing')
        // }else{
        //     toast.error(msg)
        // }
    }
    const handlePhar = () => {
        // Opens the link in a new tab
        window.open('https://pharmacy.42web.io', '_blank');
    };
  return (
    <div>
        <div className="main-content">
        <wc-toast></wc-toast>
            <div className="content">
                <div className="box generate-box">
                    <button onClick={handlePatient}>
                        <FontAwesomeIcon className='icon-file' icon={faAddressCard} />
                        <h5>Add Patient Details</h5>
                    </button>
                    
                </div>
                <div className="box view-box">
                    <button onClick={handleView}>
                        <FontAwesomeIcon className='icon-file' icon={faFile} />
                        <h5>View Patient Records</h5>
                    </button>
                </div>
                <div className="box upload-box">
                    <button onClick={handleBilling}>
                    <FontAwesomeIcon className='icon-file' icon={faFileInvoice} />
                        <h5>Billing</h5>
                    </button>
                </div>
                <div className="box pharmacy-box">
                    <button onClick={handlePhar}>
                    <FontAwesomeIcon className='icon-file' icon={faPrescriptionBottleMedical} />
                        <h5>Pharmacy </h5>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
