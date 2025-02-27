import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { assets } from '../../assets/assets';

const DashBoard = () => {
  const {dashData, getDashData, cancelAppointment}= useContext(AdminContext);
  useEffect(()=>{
    getDashData()

  },[])
  return  dashData && (
    <div className="m-5 grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Doctors Card */}
  <div className="flex items-center gap-4 bg-white shadow-md p-6 rounded-2xl">
    <img src={assets.doctor_icon} alt="Doctor Icon" className="w-16 h-16" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
      <p className="text-gray-500">Doctors</p>
    </div>
  </div>

  {/* Appointments Card */}
  <div className="flex items-center gap-4 bg-white shadow-md p-6 rounded-2xl">
    <img src={assets.appointment_icon} alt="Appointment Icon" className="w-16 h-16" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
      <p className="text-gray-500">Appointments</p>
    </div>
  </div>

  {/* Patients Card */}
  <div className="flex items-center gap-4 bg-white shadow-md p-6 rounded-2xl">
    <img src={assets.patients_icon} alt="Patients Icon" className="w-16 h-16" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
      <p className="text-gray-500">Patients</p>
    </div>
  </div>
  <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl mx-auto">
  {/* Header */}
  <div className="flex items-center gap-3 border-b pb-3 mb-4">
    <img src={assets.list_icon} alt="Latest Bookings" className="w-6 h-6" />
    <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
  </div>

  {/* Appointments List */}
  <div className="space-y-6"> {/* Increased vertical spacing */}
    {dashData.latestAppointments.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[auto_1fr_auto] items-center gap-8 p-4 bg-gray-100 rounded-lg shadow-sm"
      >
        {/* Doctor Image */}
        <img
          src={item.docData.image}
          alt={item.docData.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Booking Details */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium text-gray-800">{item.docData.name}</p>
          <p className="text-sm text-gray-500">{item.slotDate}</p>
        </div>

        {/* Cancel Button */}
        {item.cancelled ? (
          <p className="text-red-500 text-sm font-medium">Cancelled</p>
        ) : (
          <button
            onClick={() => cancelAppointment(item._id)}
            className="flex items-center justify-center   text-white w-10 h-10 rounded-full transition"
          >
            <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6" />
          </button>
        )}
      </div>
    ))}
  </div>
</div>

</div>

  )
}

export default DashBoard
