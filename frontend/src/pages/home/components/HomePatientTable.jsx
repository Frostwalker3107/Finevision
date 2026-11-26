import React from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { patientData } from '../../../data/PatientData';
import { Box } from '@mui/material';

const HomePatientsTable = () => {
    const lastVisitColumns = [
        {
            accessorKey: 'patientName',
            header: 'Name',
            minSize: 40,
        },
        {
            accessorKey: 'lastVisitDate',
            header: 'Last Visit Date',
            minSize: 40,
        },
    ]
    const nextVisitColumns = [
        {
            accessorKey: 'patientName',
            header: 'Name',
            minSize: 40,
        },
        {
            accessorKey: 'nextVisitDate',
            header: 'Next Visit Date',
            minSize: 40,
        },
    ]
    const lastVisitTable = useMaterialReactTable({
        columns: lastVisitColumns,
        data: patientData ?? [],
        enablePagination: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableColumnActions:false,
        enableSorting: false,
        muiTableBodyCellProps: {
            sx: {
                border: '1px solid #D3D3D3',
            },
        }, 
        muiTableHeadCellProps: {
            sx: {
                border: '1px solid #D3D3D3',
                backgroundColor: '#222151',
                color: "#EEE"
            },
        },
    });

    const nextVisitTable = useMaterialReactTable({

        columns: nextVisitColumns,
        data: patientData ?? [],
        enablePagination: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableColumnActions:false,
        enableSorting: false,
        muiTableBodyCellProps: {
            sx: {
                border: '1px solid #D3D3D3',
            },
        }, 
        muiTableHeadCellProps: {
            sx: {
                border: '1px solid #D3D3D3',
                backgroundColor: '#222151',
                color: "#EEE"
            },
        },
    });

    return (
        <>
            <Box sx={{ width: "100%", gap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} >
                <MaterialReactTable table={lastVisitTable} />
                <MaterialReactTable table={nextVisitTable} />

            </Box>
        </>
    );
}

export default HomePatientsTable