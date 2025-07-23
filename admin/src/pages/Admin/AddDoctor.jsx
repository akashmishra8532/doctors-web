import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/adminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) return toast.error('Image not selected');

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 Year');
                setFees('');
                setAbout('');
                setSpeciality('General physician');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">➕ Add Doctor</h2>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl space-y-6 overflow-y-auto max-h-[85vh]">

                {/* Image Upload */}
                <div className="flex items-center gap-5">
                    <label htmlFor="doc-img" className="cursor-pointer group relative">
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Upload"
                            className="w-24 h-24 rounded-full object-cover border-4 border-dashed border-gray-300 group-hover:scale-105 transition-transform"
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className="text-sm text-gray-600">Upload Doctor's Profile Picture</p>
                </div>

                {/* Inputs Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Name "
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="doctor@example.com"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Secure password"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm">
                            {[...Array(10)].map((_, i) => (
                                <option key={i}>{i + 1} Year</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fees (in ₹)</label>
                        <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="e.g. 500"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                        <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm">
                            {[
                                "General physician",
                                "Gynecologist",
                                "Dermatologist",
                                "Pediatricians",
                                "Neurologist",
                                "Gastroenterologist"
                            ].map((spec, i) => <option key={i}>{spec}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g. MBBS, MD"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Street, House No"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="City, State, PIN"
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm" required />
                    </div>
                </div>

                {/* About Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Doctor</label>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                        placeholder="Write about the doctor’s qualifications, behavior, clinic hours etc." required />
                </div>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium py-3 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        Add Doctor
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddDoctor;
