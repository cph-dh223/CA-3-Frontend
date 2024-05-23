const createNote = async (note) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/note/create`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: {
                ...note
            }
        });

        return await result.json();

    } catch (e) {
        console.log(e);
    }
}

const readNote = async () => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/note`, {
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

const updateNote = async (note) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/note/update/${note.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:{
                ...note
            }
        });
        return await result.json();

    } catch (e) {
        console.log(e);
    }
}

const deleteNote = async (note) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/note/delete/${note.id}`, {
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
const sortByFetch = async (endURL) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL_DEV}/user/notes/sort/${endURL}`, {
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

export { searchByTitle, sortByCategory, sortByTitle, sortByDate }