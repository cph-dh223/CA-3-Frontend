import { BASE_URL } from "../utils/globalVariables";


const getUserEmails = async () => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL}/users/email`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        return await result.json();

    } catch (e) {
        console.log(e);
    }
}

export { getUserEmails }