import React from 'react'
import { patientData } from '../../data/PatientData';
import { useNavigate, useParams } from 'react-router-dom';

const SinglePatient = () => {
    const { srNo } = useParams();
    const navigate = useNavigate();
    let patient = patientData.find(item => item.srNo === srNo);
    return (
        <div className="flex gap-[50px] p-[40px]">
            <div className="flex flex-col gap-2">
                <button type="button" onClick={() => navigate("/patients")} className="flex items-center justify-center text-l text-white font-bold bg-[#5cadd6] rounded-[8px] h-[50px] w-[150px]">
                    Back to Patients
                </button>
                <h2 className="text-xl font-bold"> Patient Details</h2>
                <p>Name: {patient.patientName}</p>
                <p>Patient ID: {patient.srNo}</p>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <p>Last Visit Date: {patient.lastVisitDate}</p>
                <p>Mobile No: {patient.mobileNo}</p>
                <p>Email ID: {patient.emailId}</p>
                <p>Blood Group: {patient.bloodGroup}</p>
            </div>
        </div>
    )
}

export default SinglePatient