import { useState } from "react"


const DriverVerification = () => {

const [formData,setFormData] = useState({

     driverName: "",
     licenceNumber: "",
     phone: "",
     vehicleNumber: "",

});

  const [licenceFile, setLicenceFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [status, setStatus] = useState("Not Submitted");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!licenceFile || !aadhaarFile) {
      alert("Please upload both documents");
      return;
    }

    setStatus("Pending");
    alert("Verification submitted successfully!");
  };


  return (
<>


<div className="min-h-screen bg-gray-100 flex">

<aside className="w-64 bg-green-900 text-white p-6 md:block">

      <h1 className="text-2xl font-bold mb-10">AUTO E-PASSBOOK</h1>

    <nav className="space-y-4" >

         <p className="p-3 rounded-lg hover:bg-green-800 cursor-pointer">Dashboard</p>

         <p className="p-3 rounded-lg hover:bg-green-800 cursor-pointer">Driver Verification</p>

         <p className="p-3 rounded-lg hover:bg-green-800 cursor-pointer">Profile</p>

    </nav>

</aside>

<main>

<div className="mb-8">

<h2  className="text-3xl font-bold text-gray-800">Driver Verification</h2>

<p className="text-gray-500 mt-2">Complete your details and upload ducuments for verification.</p>

</div>

            {/* Status Card */}

          <div  className="bg-white rounded-xl p-5 shadow-sm mb-7 flex justify-between items-center">

                 <div>

                      <h3  className="font-semibold text-gray-700">Verification Status</h3>

                      <p  className="text-sm text-gray-500 mt-1">Track your document verification</p>

                 </div>

    <span className={` px-4 py-2 rounded-full text-sm font-semibold ${
        
       status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "Approved"
              ? "bg-green-100 text-green-700"
              : status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
    
    
    } `}>{status}</span>
     </div>

    <form onSubmit={handleSubmit}
    className="bg-white rounded-xl shadow-sm p-6 md:p-8">

        <h3  className="text-xl font-bold text-gray-800 mb-6">
           Driver Information 
        </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Driver Name */}

         <div>
            <label>
                Driver Name
            </label>

            <input type="text"
                   name="driver name"
                   value={formData.driverName} 
                   onChange={handleSubmit} 
                   placeholder="Enter your name"
                   required 
                   className="w-full border border-gray-300 rounded-lg p-3 
                              outline-none focus:ring-2 focus:ring-green-600"/>
         </div>

           {/* Licence Number */}

          <div>
              <label className="block mb-2 font-medium text-gray-700">
                Driving Licence Number
              </label>

              <input
                type="text"
                name="licenceNumber"
                value={formData.licenceNumber}
                onChange={handleChange}
                placeholder="Enter licence number"
                required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

               {/* Phone */}

             <div>
              <label className="block mb-2 font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" pattern="[0-9]{10}"
                maxLength="10" required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

                              {/* Vehicle Number */}

                             <div>
                                 <label className="block mb-2 font-medium text-gray-700">
                                       Vehicle Number
                               </label>

                                <input
                                      type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="TN 01 AB 1234" required
               
                                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
              
                                />

                            </div>            

                    </div>

                       {/* Document Upload */}

                        <h3 className="text-xl font-bold text-gray-800 mt-10 mb-6">
                           Upload Documents
                        </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                     {/* Driving Licence */}

                     <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">

                             <div className="text-3xl mb-3">📄</div>

                             <h4 className="font-semibold text-gray-700">
                                Driving Licence
                             </h4>

                             <p className="text-sm text-gray-500 my-3">
                               Upload your licence document
                             </p>

                             <input type="file" accept="image/*,.pdf" required 
                               onChange={(e) => setLicenceFile(e.target.files[0])}  
                               className="w-full text-sm"
                             />

                             {licenceFile && (
                             <p className="text-sm text-green-700 mt-3">
                                 {licenceFile.name}
                             </p>
                         )}

                     </div>

                     {/* Aadhaar */}
                     <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                 <div className="text-3xl mb-3">🪪</div>

                              <h4 className="font-semibold text-gray-700">
                                 Aadhaar Card
                              </h4>

                              <p className="text-sm text-gray-500 my-3">
                                Upload your Aadhaar document
                              </p>

                              <input
                                type="file"
                                accept="image/*,.pdf"
                                required
                                onChange={(e) => setAadhaarFile(e.target.files[0])}
                                className="w-full text-sm"
                              />

                                {aadhaarFile && (
                                <p className="text-sm text-green-700 mt-3">
                                 {aadhaarFile.name}
                              </p>
                         )}
                     </div>

                      </div>


                     {/* Submit */}
                      <div className="mt-8 flex justify-end">
                      <button
                          type="submit"
                          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                         >
                         Submit for Verification
                     </button>
         
                 </div>
             </form>

           {/* </div> */}

        </main>

     </div>

  </>
  )
}

export default DriverVerification