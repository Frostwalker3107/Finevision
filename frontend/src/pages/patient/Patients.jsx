
import React, { useEffect, useMemo, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  parse,
  parseISO,
  isValid,
  startOfDay,
  endOfDay,
  format,
} from "date-fns";

import PatientsTable from "../patient/components/PatientTable";
import usePatient from "./hooks/usePatient";

const NAVY = "#222151";
const BLUE = "#5cadd6";

const INITIAL_FILTERS = {
  patientName: "",
  gender: "",
  bloodGroup: "",
  fromDate: null,
  toDate: null,
};

const INITIAL_PATIENT = {
  patientName: "",
  age: "",
  gender: "",
  mobileNo: "",
  emailId: "",
  bloodGroup: "",
  lastVisitDate: null,
};

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Z+",
];

const parsePatientDate = (dateValue) => {
  if (!dateValue) return null;

  if (dateValue instanceof Date) {
    return isValid(dateValue) ? dateValue : null;
  }

  const value = String(dateValue).trim();

  const parsedDate = parse(value, "dd-MM-yyyy", new Date());

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  const isoDate = parseISO(value);

  return isValid(isoDate) ? isoDate : null;
};

const Patients = () => {
  const { patients, loading, error, fetchPatients, createPatient } =
    usePatient();

  // Filters
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  // Create Patient Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [patientForm, setPatientForm] = useState(INITIAL_PATIENT);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Dropdown options
  const filterOptions = useMemo(() => {
    const patientList = patients ?? [];

    return {
      patientNames: [
        ...new Set(patientList.map((p) => p.patientName).filter(Boolean)),
      ],
      genders: [...new Set(patientList.map((p) => p.gender).filter(Boolean))],
      bloodGroups: [
        ...new Set(patientList.map((p) => p.bloodGroup).filter(Boolean)),
      ],
    };
  }, [patients]);

  // Update filters
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]:
        value ?? (field === "fromDate" || field === "toDate" ? null : ""),
    }));
  };

  // Apply filters
  const handleSearch = () => {
    if (
      filters.fromDate &&
      filters.toDate &&
      startOfDay(filters.fromDate) > startOfDay(filters.toDate)
    ) {
      return;
    }

    setAppliedFilters({ ...filters });
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ ...INITIAL_FILTERS });
    setAppliedFilters({ ...INITIAL_FILTERS });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== "",
  );

  const hasAppliedFilters = Object.values(appliedFilters).some(
    (value) => value !== null && value !== "",
  );

  // Filter patients
  const filteredPatients = useMemo(() => {
    return (patients ?? []).filter((patient) => {
      const patientName = (patient.patientName ?? "").toLowerCase();
      const gender = (patient.gender ?? "").toLowerCase();
      const bloodGroup = (patient.bloodGroup ?? "").toLowerCase();

      const nameMatch = patientName.includes(
        appliedFilters.patientName.toLowerCase(),
      );

      const genderMatch = gender.includes(
        appliedFilters.gender.toLowerCase(),
      );

      const bloodGroupMatch = bloodGroup.includes(
        appliedFilters.bloodGroup.toLowerCase(),
      );

      const patientDate = parsePatientDate(patient.lastVisitDate);

      const fromDateMatch =
        !appliedFilters.fromDate ||
        (patientDate &&
          patientDate >= startOfDay(appliedFilters.fromDate));

      const toDateMatch =
        !appliedFilters.toDate ||
        (patientDate &&
          patientDate <= endOfDay(appliedFilters.toDate));

      return (
        nameMatch &&
        genderMatch &&
        bloodGroupMatch &&
        fromDateMatch &&
        toDateMatch
      );
    });
  }, [patients, appliedFilters]);

  // Open dialog
  const handleOpenDialog = () => {
    setPatientForm({ ...INITIAL_PATIENT });
    setFormErrors({});
    setSaveError("");
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    if (saving) return;

    setDialogOpen(false);
    setPatientForm({ ...INITIAL_PATIENT });
    setFormErrors({});
    setSaveError("");
  };

  // Update form
  const handleFormChange = (field, value) => {
    setPatientForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!patientForm.patientName.trim()) {
      errors.patientName = "Patient name is required";
    }

    if (
      patientForm.age === "" ||
      !Number.isInteger(Number(patientForm.age)) ||
      Number(patientForm.age) < 0 ||
      Number(patientForm.age) > 150
    ) {
      errors.age = "Enter a valid age";
    }

    if (!patientForm.gender) {
      errors.gender = "Please select gender";
    }

    if (!/^\d{10}$/.test(patientForm.mobileNo)) {
      errors.mobileNo = "Enter a valid 10-digit mobile number";
    }

    if (
      patientForm.emailId &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientForm.emailId)
    ) {
      errors.emailId = "Enter a valid email address";
    }

    if (!patientForm.bloodGroup) {
      errors.bloodGroup = "Please select blood group";
    }

    if (
      !patientForm.lastVisitDate ||
      !isValid(patientForm.lastVisitDate)
    ) {
      errors.lastVisitDate = "Please select last visit date";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Create patient
  const handleCreatePatient = async () => {
    if (saving || !validateForm()) return;

    try {
      setSaving(true);
      setSaveError("");

      const payload = {
        ...patientForm,
        patientName: patientForm.patientName.trim(),
        age: String(patientForm.age),
        mobileNo: patientForm.mobileNo,
        emailId: patientForm.emailId.trim(),
        lastVisitDate: format(
          patientForm.lastVisitDate,
          "dd-MM-yyyy",
        ),
      };

      const response = await createPatient(payload);

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to create patient.",
        );
      }

      // Close and reset dialog
      setDialogOpen(false);
      setPatientForm({ ...INITIAL_PATIENT });
      setFormErrors({});
      setSaveError("");

      // Reset filters so the new patient is visible
      setFilters({ ...INITIAL_FILTERS });
      setAppliedFilters({ ...INITIAL_FILTERS });

      // Patient list is refreshed inside usePatient.createPatient().
    } catch (err) {
      setSaveError(
        err.message || "Unable to create patient. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading && (!patients || patients.length === 0)) {
    return <Box sx={{ p: "40px" }}>Loading patients...</Box>;
  }

  if (error) {
    return (
      <Box sx={{ p: "40px" }}>
        Unable to load patients. Please try again.
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          p: "40px",
        }}
      >
        {/* Filter Toolbar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: "100%",
            flexWrap: "nowrap",
          }}
        >
          {/* Patient Name */}
          <Autocomplete
            freeSolo
            options={filterOptions.patientNames}
            value={filters.patientName || null}
            inputValue={filters.patientName}
            onChange={(_, value) =>
              handleFilterChange("patientName", value)
            }
            onInputChange={(_, value) =>
              handleFilterChange("patientName", value)
            }
            ListboxProps={{
              sx: {
                maxHeight: "200px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#bdbdbd",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#888888",
                },
              },
            }}
            sx={{ flex: 1.2, minWidth: 0 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Patient Name"
                size="small"
              />
            )}
          />

          {/* Gender */}
          <Autocomplete
            freeSolo
            options={filterOptions.genders}
            value={filters.gender || null}
            inputValue={filters.gender}
            onChange={(_, value) =>
              handleFilterChange("gender", value)
            }
            onInputChange={(_, value) =>
              handleFilterChange("gender", value)
            }
            sx={{ flex: 0.8, minWidth: 0 }}
            renderInput={(params) => (
              <TextField {...params} label="Gender" size="small" />
            )}
          />

          {/* Blood Group */}
          <Autocomplete
            freeSolo
            options={filterOptions.bloodGroups}
            value={filters.bloodGroup || null}
            inputValue={filters.bloodGroup}
            onChange={(_, value) =>
              handleFilterChange("bloodGroup", value)
            }
            onInputChange={(_, value) =>
              handleFilterChange("bloodGroup", value)
            }
            sx={{ flex: 0.8, minWidth: 0 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Blood Group"
                size="small"
              />
            )}
          />

          {/* From Date */}
          <DatePicker
            label="From Date"
            format="dd-MM-yyyy"
            value={filters.fromDate}
            onChange={(value) =>
              handleFilterChange("fromDate", value)
            }
            maxDate={filters.toDate || undefined}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
            sx={{ flex: 0.9, minWidth: 0 }}
          />

          {/* To Date */}
          <DatePicker
            label="To Date"
            format="dd-MM-yyyy"
            value={filters.toDate}
            onChange={(value) =>
              handleFilterChange("toDate", value)
            }
            minDate={filters.fromDate || undefined}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
            sx={{ flex: 0.9, minWidth: 0 }}
          />

          {/* Search */}
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={
              filters.fromDate &&
              filters.toDate &&
              startOfDay(filters.fromDate) >
                startOfDay(filters.toDate)
            }
            sx={{
              height: "40px",
              minWidth: "105px",
              flexShrink: 0,
              backgroundColor: NAVY,
              color: "#FFFFFF",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#35336D",
                boxShadow: "none",
              },
            }}
          >
            Search
          </Button>

          {/* Clear */}
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            disabled={!hasActiveFilters && !hasAppliedFilters}
            sx={{
              height: "40px",
              minWidth: "85px",
              flexShrink: 0,
              color: NAVY,
              borderColor: NAVY,
              textTransform: "none",
            }}
          >
            Clear
          </Button>

          {/* Add Patient */}
          <Button
            variant="contained"
            onClick={handleOpenDialog}
            sx={{
              width: "45px",
              height: "45px",
              minWidth: "45px",
              flexShrink: 0,
              backgroundColor: BLUE,
              color: NAVY,
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

        {/* Result Count */}
        <Box>
          Showing {filteredPatients.length} of {patients?.length ?? 0} patients
        </Box>

        {/* Patients Table */}
        <PatientsTable patients={filteredPatients} />
      </Box>

      {/* Create Patient Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: NAVY,
            fontWeight: 700,
          }}
        >
          Create New Patient

          <IconButton
            onClick={handleCloseDialog}
            disabled={saving}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography fontSize={13} color="text.secondary" mb={3}>
            Enter the patient's personal and contact information.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Patient Name"
                value={patientForm.patientName}
                onChange={(event) =>
                  handleFormChange("patientName", event.target.value)
                }
                error={!!formErrors.patientName}
                helperText={formErrors.patientName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                value={patientForm.age}
                onChange={(event) =>
                  handleFormChange("age", event.target.value)
                }
                error={!!formErrors.age}
                helperText={formErrors.age}
                inputProps={{ min: 0, max: 150 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="Gender"
                value={patientForm.gender}
                onChange={(event) =>
                  handleFormChange("gender", event.target.value)
                }
                error={!!formErrors.gender}
                helperText={formErrors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Mobile Number"
                value={patientForm.mobileNo}
                onChange={(event) =>
                  handleFormChange(
                    "mobileNo",
                    event.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                error={!!formErrors.mobileNo}
                helperText={formErrors.mobileNo}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                value={patientForm.emailId}
                onChange={(event) =>
                  handleFormChange("emailId", event.target.value)
                }
                error={!!formErrors.emailId}
                helperText={formErrors.emailId}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="Blood Group"
                value={patientForm.bloodGroup}
                onChange={(event) =>
                  handleFormChange("bloodGroup", event.target.value)
                }
                error={!!formErrors.bloodGroup}
                helperText={formErrors.bloodGroup}
              >
                {BLOOD_GROUPS.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Last Visit Date"
                format="dd-MM-yyyy"
                value={patientForm.lastVisitDate}
                onChange={(value) =>
                  handleFormChange("lastVisitDate", value)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!formErrors.lastVisitDate,
                    helperText: formErrors.lastVisitDate,
                  },
                }}
              />
            </Grid>
          </Grid>

          {saveError && (
            <Typography color="error" fontSize={13} mt={2}>
              {saveError}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={saving}
            sx={{
              color: NAVY,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreatePatient}
            disabled={saving}
            sx={{
              backgroundColor: NAVY,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#35336D",
              },
            }}
          >
            {saving ? "Saving..." : "Save Patient"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Patients;
