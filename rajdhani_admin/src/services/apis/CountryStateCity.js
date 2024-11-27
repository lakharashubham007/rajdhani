import axios from "axios";

export const getCountryStateCityApi = async () => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(`https://sponsorringus.com/admin/api/v1/GetcountryStatesCity`, 
            // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
