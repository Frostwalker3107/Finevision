
import React from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const PatientsTable = ({ patients = [] }) => {

    const columns = [
        {
            accessorKey: 'srNo',
            header: 'Sr No',
            size: 80,
        },
        {
            accessorKey: 'patientName',
            header: 'Name',
            size: 150,
        },
        {
            accessorKey: 'age',
            header: 'Age',
            size: 80,
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            size: 100,
        },
        {
            accessorKey: 'lastVisitDate',
            header: 'Last Visit Date',
            size: 150,
        },
        {
            accessorKey: 'mobileNo',
            header: 'Mobile No.',
            size: 150,
        },
        {
            accessorKey: 'emailId',
            header: 'Email ID',
            size: 200,
        },
        {
            accessorKey: 'bloodGroup',
            header: 'Blood Group',
            size: 120,
        },
    ];

    const table = useMaterialReactTable({
        columns,
        data: patients,
    });

    return <MaterialReactTable table={table} />;
};

export default PatientsTable;
