
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PatientsTable from "../patient/components/PatientTable";
import usePatient from "./hooks/usePatient";

const Patients = () => {
    const navigate = useNavigate();

    const { patients, loading, error, fetchPatients } = usePatient();

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    if (loading) {
        return (
            <Box sx={{ p: "40px" }}>
                Loading patients...
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                p: "40px",
            }}
        >
            {/* Add Patient Button */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 2,
                    width: "100%",
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{
                        width: "50px",
                        height: "50px",
                        minWidth: "50px",
                        backgroundColor: "#5cadd6",
                        color: "#222151",
                        fontSize: "28px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: 0,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#489bc5",
                            boxShadow: "none",
                        },
                    }}
                >
                    +
                </Button>
            </Box>

            {/* Patients Table */}
            <PatientsTable patients={patients} />
        </Box>
    );
};

export default Patients;
