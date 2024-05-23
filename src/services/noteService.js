

const searchByTitle = async (seachString) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/notes/search/${seachString}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        return await result.json();
        
    } catch (e) {
        console.log(e);
    }
}
const sortByCategory = () => {
    return sortByFetch('category')
}

const sortByTitle = () => {
    return sortByFetch('title')
}

const sortByDate = () => { 
    return sortByFetch('date')
}
onst sortByFetch = async (endURL) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/notes/sort/${endURL}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await result.json();
        return data
    } catch (e) {
        console.log(e);
    }
}

export { searchByTitle, sortByCategory, sortByTitle, sortByDate }