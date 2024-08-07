import { useState } from "react";
import axios from "../utils/axios";

const AddMedicineForm = ({ reminderId, AddMedicine }) => {
  const [medicineName, setMedicineName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/reminders/${reminderId}/medicine`,
        {
          medicineName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      AddMedicine(response.data);
      setMedicineName("");
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add New Medicine</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="medicineName" className="form-label">
              Medicine Name
            </label>
            <input
              type="text"
              className="form-control"
              id="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineForm;
