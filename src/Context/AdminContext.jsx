import { createContext,useEffect ,useState} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const AdminContext = createContext()

const AdminContextProvider = ({children})=>{
    const [aToken, setaToken] = useState(localStorage.getItem('aToken') || ""); // Cleaner way

    const [doctors, setDoctors] = useState([])
   
    
   
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-doctors",
                {},
                {
                  headers:aToken
                }
            );
    
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/change-availability',
                { docId },
                
            );
    
            if (data.success) {
                toast.success(data.message);
                // Optionally, update the state directly instead of calling getAllDoctors()
                getAllDoctors(); // Refresh all doctors' data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error); // Log error for debugging purposes
            toast.error(error.response?.data?.message || error.message); // Handle error message
        }
    };
    
    
    const  value = {
                aToken , setaToken, backendUrl , doctors, getAllDoctors, changeAvailability
     }
     
     return (
        <AdminContext.Provider value={value}>
            {
                children
            }
        </AdminContext.Provider>
     )
}
export  default AdminContextProvider;