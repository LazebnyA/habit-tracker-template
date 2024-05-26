import axios from "axios";

export const getHabit = async (habit_id) => {
    try {
        const habitsResponse = await axios.get(`http://127.0.0.1:8000/habits/get/${habit_id}`, {
              headers: {
                'accept': 'application/json'
              }
            });
            return habitsResponse.data
    } catch (error) {
        return error.response.data
    }
}