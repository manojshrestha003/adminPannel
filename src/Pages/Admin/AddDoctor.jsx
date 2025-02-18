import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios'

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

    try {
      if (!docImage) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append('image', docImage);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));  // Fixed the Number conversion
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Console log form data
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // API request (Example)
      const { data } = await axios.post(backendUrl + "/api/admin/add-doctors", formData, {headers:aToken
      })

      if (data.success) {
        toast.success(data.message);
        
        // Clear form fields after successful submission
        setDocImage(null); // Ensure image is cleared
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg space-y-6">
      <p className="text-xl font-semibold text-gray-700">Add Doctor</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                alt="Doctor"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </label>
            <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-gray-500 text-sm">Upload Doctor <br /> Picture</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Your Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Doctor Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Doctor Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Experience</p>
            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              {[...Array(9)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fees</p>
            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fee" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Speciality</p>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-gray-600">Education</p>
            <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">About Doctor</p>
        <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write about doctor" rows={5} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
      </div>
      <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Add Doctor</button>
    </form>
  );
};

export default AddDoctor;
