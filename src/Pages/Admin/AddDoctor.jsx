import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!docImage) {
      return toast.error("Please select an image.");
    }

    const formData = new FormData();
    formData.append('image', docImage);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`
          }

        });


      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form fields after successful submission
        setDocImage(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 md:p-8 animate-[fadeIn_0.4s_ease-out]">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Add Doctor</h1>
        <p className="text-gray-500 mt-1">Fill in the details below to register a new doctor.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl shadow-md overflow-hidden">

        {/* Image Upload + Basic Info Section */}
        <div className="p-6 md:p-8 space-y-8">

          {/* Upload Area */}
          <div className="flex items-center gap-6">
            <label htmlFor="doc-img" className="cursor-pointer group relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-blue-400 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                <img
                  src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-28 h-28 rounded-2xl bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </label>
            <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id="doc-img" hidden />
            <div>
              <p className="text-sm font-semibold text-gray-800">Upload Doctor Picture</p>
              <p className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP. Max 2MB.</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Doctor Name</label>
                <input
                  onChange={(e) => setName(e.target.value)} value={name} type="text"
                  placeholder="e.g. Dr. John Smith" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)} value={email} type="email"
                  placeholder="doctor@example.com" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)} value={password} type="password"
                  placeholder="••••••••" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Experience</label>
                <select
                  onChange={(e) => setExperience(e.target.value)} value={experience}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                >
                  {[...Array(9)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Consultation Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">Rs</span>
                  <input
                    onChange={(e) => setFees(e.target.value)} value={fees} type="number"
                    placeholder="0.00" required
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Speciality</label>
                <select
                  onChange={(e) => setSpeciality(e.target.value)} value={speciality}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                >
                  {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gastroenterologist'].map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Education / Degree</label>
                <input
                  onChange={(e) => setDegree(e.target.value)} value={degree} type="text"
                  placeholder="e.g. MBBS, MD" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Address Line 1</label>
                <input
                  onChange={(e) => setAddress1(e.target.value)} value={address1} type="text"
                  placeholder="Street address" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Address Line 2</label>
                <input
                  onChange={(e) => setAddress2(e.target.value)} value={address2} type="text"
                  placeholder="City, State, ZIP" required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* About Section — Full Width */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)} value={about}
              placeholder="Write a brief description about the doctor's experience, expertise, and background..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Footer */}
        <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100">
          <button
            type='submit'
            className="w-full md:w-auto md:px-12 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            Add Doctor
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddDoctor;
