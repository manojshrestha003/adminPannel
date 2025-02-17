import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to={'/admin-dashboard'}
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg"
          >
            <img src={assets.home_icon} alt="" className="w-6 h-6 filter invert" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg"
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6 filter invert" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={'/add-doctor'}
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg"
          >
            <img src={assets.add_icon} alt="" className="w-6 h-6 filter invert" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to={'/doctors-list'}
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg"
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6 filter invert" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
