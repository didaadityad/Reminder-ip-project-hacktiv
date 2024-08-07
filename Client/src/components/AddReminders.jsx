import { useState } from "react";
import axios from '../utils/axios'

export default function AddReminder({addReminder}){
    const [reminder, setReminder] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           await axios({
                method: 'post',
                url: '/reminders',
                data: reminder,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">Create New Reminder</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="reminderName" className="form-label">Reminder Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="reminderName"
                        value={reminder.name}
                        onChange={(e) => setReminder({ ...reminder, name: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Reminder</button>
            </form>
        </div>
    </div>
    )
}