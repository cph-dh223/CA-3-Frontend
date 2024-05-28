
import { BASE_URL } from "../utils/globalVariables";

const createNote = async (note) => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL}/user/note/create`, {
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

const readAllNotes = async () => {
    try {
        const token = localStorage.getItem("token")


        if (token) {
            const result = await fetch(`${BASE_URL}/user/notes/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

        const theResult = await result.json();
        
        return theResult;
    }

    } catch (e) {
        console.log(e);
    }
}

const readNote = async () => {
    try {
        const token = localStorage.getItem("token")

        const result = await fetch(`${BASE_URL}/user/note`, {
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

        const result = await fetch(`${BASE_URL}/user/note/update/${note.id}`, {
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

        const result = await fetch(`${BASE_URL}/user/note/delete/${note.id}`, {
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
    const token = localStorage.getItem("token");

        const result = await fetch(`${BASE_URL}/user/notes/search/${seachString}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return await result.json();

    } catch (e) {
        console.log(e);
    }
};

const sortByCategory = () => {
  return sortByFetch("category");
};

const sortByTitle = () => {
  return sortByFetch("title");
};

const sortByDate = () => {

    return sortByFetch('date')
};


const sortByFetch = async (endURL) => {

  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${BASE_URL}/notes/sort/${endURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

        return await result.json();
    } catch (e) {
        console.log(e);
    }
}

export { searchByTitle, sortByCategory, sortByTitle, sortByDate, createNote, readNote, updateNote, deleteNote, readAllNotes};
