import { createContext,useEffect ,useState} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const AdminContext = createContext()

const AdminContextProvider = ({children})=>{
    const [aToken, setaToken] = useState(localStorage.getItem('aToken') || ""); // Cleaner way

    const [doctors, setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    
   
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-doctors",
                {}
               
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
                {
                    headers: { Authorization: `Bearer ${aToken}` }
                }
                
            );
    
            if (data.success) {
                toast.success(data.message);
                
                getAllDoctors(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error); 
            toast.error(error.response?.data?.message || error.message); 
        }
    };
    
    const getallAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments')
            if(data.success){
                setAppointments(data.appointmemts)
            }
            else
            {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error:", error); 
            toast.error(error.response?.data?.message || error.message);
            
        }
    }
    const cancelAppointment = async (appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment', {appointmentId})
            if(data.success){
                toast.success(data.message)
                getallAppointments()
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.error("Error:", error); 
            toast.error(error.response?.data?.message || error.message);
            
        }

    }
    
    const  value = {
                aToken , setaToken, backendUrl , doctors, getAllDoctors, changeAvailability,appointments, setAppointments,getallAppointments, cancelAppointment
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