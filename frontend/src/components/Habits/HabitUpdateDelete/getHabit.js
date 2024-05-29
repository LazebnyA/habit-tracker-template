import axios from "axios";

export const getHabit = async (habit_id) => {
    try {
        const habitsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/habits/get/${habit_id}`, {
              headers: {
                'accept': 'application/json'
              }
            });
            return habitsResponse.data
    } catch (error) {
        return error.response.data
    }
}