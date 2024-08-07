import React from 'react';

const MedicineCard = ({ medicine, onDelete }) => {
  const handleDelete = async () => {
    try {
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{medicine.medicineName}</h5>
        <p className="card-text">Description: {medicine.description || "No description available"}</p>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MedicineCard;
