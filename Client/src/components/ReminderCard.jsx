import { Link, useNavigate } from "react-router-dom"

export default function ReminderCard ({reminder, onDelete}){
    const nav = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            if(window.confirm("Sudah di minum bos ?")){
                onDelete(reminder.id)
            }
            nav('/reminders')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="col-md-4 mb-4">
      <Link to={`/reminders/${reminder.id}/medicine`} className="text-decoration-none">
        <div className="card h-100 shadow-sm">
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title text-primary">{reminder.name}</h5>
            </div>
            <div className="mt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox-${reminder.id}`}
                  onChange={handleDelete}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox-${reminder.id}`}
                  style={{ cursor: "pointer" }}
                >
                  Done
                </label>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
    )
}