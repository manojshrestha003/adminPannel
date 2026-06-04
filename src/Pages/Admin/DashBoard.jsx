import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { assets } from '../../assets/assets';

const DashBoard = () => {
  const {dashData, getDashData, cancelAppointment}= useContext(AdminContext);
  useEffect(()=>{
    getDashData()

  },[])
  return  dashData && (
    <div className="p-6 md:p-8 space-y-8 animate-[fadeIn_0.4s_ease-out]">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your clinic.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Doctors Card */}
        <div className="group flex items-center gap-5 bg-white shadow-md hover:shadow-xl p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default border border-transparent hover:border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <img src={assets.doctor_icon} alt="Doctor Icon" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-800 tabular-nums">{dashData.doctors}</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mt-0.5">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="group flex items-center gap-5 bg-white shadow-md hover:shadow-xl p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default border border-transparent hover:border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <img src={assets.appointment_icon} alt="Appointment Icon" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-800 tabular-nums">{dashData.appointments}</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mt-0.5">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="group flex items-center gap-5 bg-white shadow-md hover:shadow-xl p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default border border-transparent hover:border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <img src={assets.patients_icon} alt="Patients Icon" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-800 tabular-nums">{dashData.patients}</p>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mt-0.5">Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4 mb-6">
          <div className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg">
            <img src={assets.list_icon} alt="Latest Bookings" className="w-5 h-5" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
          <span className="ml-auto text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
            {dashData.latestAppointments.length} recent
          </span>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Doctor Image */}
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
              />

              {/* Booking Details */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-base font-semibold text-gray-800 truncate">{item.docData.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.slotDate}
                </p>
              </div>

              {/* Cancel Button */}
              {item.cancelled ? (
                <span className="text-red-500 text-xs font-semibold bg-red-50 px-3 py-1.5 rounded-full">Cancelled</span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex items-center justify-center text-white w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                >
                  <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
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
