import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import ReminderCard from '../components/ReminderCard'
import AddReminder from '../components/AddReminders'
export default function Reminders (){
    const [reminders, setReminders] = useState([])


    const getReminders = async () => {
        try {
            const response = await axios({
                method: `get`,
                url: `/reminders`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
            setReminders(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getReminders()
    },[])

    const addReminder = (newReminder) => {
        setReminders([...reminders, newReminder]);
        
    };

    const handleDelete = async (id) => {
        try {
            await axios({
                method: 'delete',
                url: `/reminders/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
            getReminders()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
        <div className="row mt-4">
          <div className="col-md-8">
            <h1 className="my-4">Reminder List</h1>
            <div className="row">
              {reminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} onDelete={handleDelete} />
              ))}
            </div>
          </div>
          <div className="col-md-4">
            
              <div className="card-body">
                <AddReminder addReminder={addReminder} />
              </div>
           
          </div>
        </div>
      </div>
    )
}