
import React from "react";
import { patientData } from "../../data/PatientData";
import HomePatientsTable from "./components/HomePatientTable";

const Home = () => {
    return (
        <div className="flex flex-col gap-[40px] p-[40px]">
            <HomePatientsTable patients={patientData} />
        </div>
    );
};

export default Home;
