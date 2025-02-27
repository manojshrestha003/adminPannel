import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { appointments, setAppointments, cancelAppointment, getallAppointments } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    getallAppointments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-6 mb-6">
      <p className="text-xl font-semibold text-gray-700 mb-4">All Appointments</p>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 bg-gray-100 text-gray-700 font-semibold p-3 rounded-md">
          <p className="text-center">#</p>
          <p className="text-center">Patient Name</p>
        
          <p className="text-center">Date & Time</p>
          <p className="text-center">Doctor Name</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Check if appointments is an array before calling map */}
        {appointments && Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center text-gray-600 border-b border-gray-200 p-3"
            >
              {/* Serial Number */}
              <p className="text-center">{index + 1}</p>

              {/* Patient Name */}
              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <img
                  src={item.userData.image}
                  alt="Patient"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm">{item.userData.name}</p>
              </div>

              
            

              {/* Date & Time */}
              <p className="text-center text-sm">
                {item.slotDate}, {item.slotTime}
              </p>

              {/* Doctor Name */}
              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className="text-center text-sm">{currency}{item.amount}</p>


              {/* Action (Cancel Icon) */}
              {
                item.cancelled?<p className='text-red-400 text-xs font-medium'>Cancelled</p>:
                <div className="flex justify-center">
                <img onClick={()=>cancelAppointment(item._id)}   
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
                />
              </div>

              }
             
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No appointments available.</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
