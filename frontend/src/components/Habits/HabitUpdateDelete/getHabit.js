import axios from "axios";

const baseUrl = process.env.SERVICE_BASE_URL;

export const getHabit = async (habit_id) => {
    try {
        const habitsResponse = await axios.get(`${baseUrl}/habits/get/${habit_id}`, {
              headers: {
                'accept': 'application/json'
              }
            });
            return habitsResponse.data
    } catch (error) {
        return error.response.data
    }
}