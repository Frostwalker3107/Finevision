import React from "react";
import { patientData } from "../../data/PatientData";
import HomePatientsTable from "../home/components/HomePatientTable";

const Patients = () => {
    return (
        <div className="flex flex-col gap-[40px] p-[40px]">
            <HomePatientsTable patients={patientData} />
        </div>
    )
}


export default Patients;