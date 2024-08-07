import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import MedicineCard from "../components/MedicineCard";
import AddMedicineForm from "../components/AddMedicine";

export default function Medicine() {
  const { reminderId } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    async function fetchMedicine() {
      try {
        const response = await axios({
          method: "get",
          url: `/reminders/${reminderId}/medicine`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setMedicine(response.data);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      }
    }
    fetchMedicine();
  }, [reminderId]);

  const handleAddMedicine = (newMedicine) => {
    setMedicine([...medicine, newMedicine]);
  };

  const handleDelete = async (medicineId) => {
    try {
        await axios({
            method: 'delete',
            url: `/reminders/${reminderId}/medicine/${medicineId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
        })
        fetchMedicine()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">Medicine List</h1>
          <AddMedicineForm
            reminderId={reminderId}
            AddMedicine={handleAddMedicine}
          />
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
            {medicine &&
              medicine.map((med) => (
                <div key={med.id} className="col">
                  <MedicineCard medicine={med} onDelete={() => handleDelete(med.id)}/>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
