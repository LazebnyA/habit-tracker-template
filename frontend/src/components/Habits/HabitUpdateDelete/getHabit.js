import axios from "axios";

const baseUrl = "https://evolve-service.onrender.com";

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