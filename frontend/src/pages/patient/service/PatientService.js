// import axiosInstance from "../../../api/axiosInstance";

export const response = {
  "success": true,
  "message": "Patients data fetched",
  "data": [
    {
      "srNo": "1",
      "patientName": "Arnav Sohani",
      "age": "22",
      "gender": "Male",
      "lastVisitDate": "08-10-2026",
      "mobileNo": "8767290369",
      "emailId": "arnav.sohani14@gmail.com",
      "bloodGroup": "B+"
    },
    {
      "srNo": "2",
      "patientName": "Aaron Mistri",
      "age": "67",
      "gender": "Male",
      "lastVisitDate": "08-10-2026",
      "mobileNo": "0000000000",
      "emailId": "abc@gmail.com",
      "bloodGroup": "Z+"
    },
    {
      "srNo": "3",
      "patientName": "Kaushik Patwardhan",
      "age": "23",
      "gender": "Male",
      "lastVisitDate": "09-09-2026",
      "mobileNo": "8600140470",
      "emailId": "kaushikap3001@gmail.com",
      "bloodGroup": "O+"
    },
    {
      "srNo": "4",
      "patientName": "Sandeep Sohani",
      "age": "53",
      "gender": "Male",
      "lastVisitDate": "05-10-2026",
      "mobileNo": "9881008810",
      "emailId": "sandeep.sohani25@gmail.com",
      "bloodGroup": "B+"
    },
    {
      "srNo": "5",
      "patientName": "Prajakta Sohani",
      "age": "49",
      "gender": "Female",
      "lastVisitDate": "05-07-2025",
      "mobileNo": "9881132737",
      "emailId": "sprajj4477@gmail.com",
      "bloodGroup": "A+"
    }
  ]
}
const PatientService = {
    getPatientData: async () => {
        return response;
    },

    createPatient: async (patientData) => {
        const nextSrNo =
            Math.max(
                0,
                ...response.data.map(
                    (patient) => Number(patient.srNo) || 0
                )
            ) + 1;

        const newPatient = {
            ...patientData,
            srNo: String(nextSrNo),
        };

        response.data.push(newPatient);
    // const response = await axiosInstance.get("/api/v1/patients"); 1 pagination data , 2. filters /patients?gender=""

    // return response.data;
        return {
            success: true,
            message: "Patient created successfully",
            data: newPatient,
        };
    },
};

export default PatientService;