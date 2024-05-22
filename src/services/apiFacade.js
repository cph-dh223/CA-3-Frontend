import { BASE_URL_DEV } from "../utils/globalVariables";



const login = async (username, password) => {

    try {
      const result = await fetch(`${BASE_URL_DEV}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
  
      const data = await result.json();
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }else{
        //console.log(data);
        return data;
      }

    } catch (e) {
      console.log(e);
    }
  };

  export {login};

