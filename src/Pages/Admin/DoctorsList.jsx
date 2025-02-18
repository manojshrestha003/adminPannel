import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          doctors.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={item.image} alt="" className="w-24 h-24 rounded-full object-cover mb-4"/>
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600 mb-2">{item.speciality}</p>
                <div className="flex items-center justify-center space-x-2">
                  <input onChange={()=>{changeAvailability(item._id)}} type="checkbox" checked={item.available} readOnly className="form-checkbox h-5 w-5 text-green-500" />
                  <p className="text-gray-700">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DoctorsList;
