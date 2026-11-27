
import { useState, useCallback } from "react";
import PatientService from "../service/PatientService";

const usePatient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPatients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await PatientService.getPatientData();
            setPatients(response.data);
        } catch (err) {
            setError(err.message || "Failed to fetch patient data");

        } finally {
            setLoading(false);
        }
    }, []);

    return {
        patients,
        loading,
        error,
        fetchPatients,
    };
};

export default usePatient;
