
//funtion to add a new user to the API, is called from an event listener in the "sign up" page

const addUserToApi = (name, username) => {
    const options = {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username })
    }
    return fetch(USERSURL, options)
        .then(resp => {
            if (resp.ok)
                return resp.json()
            else
                return Promise.reject(resp)
        })
        .catch(resp => {
            try {
                console.error(resp.json())
            // append error box to form with resp.json().error message
            } catch (e) {
                console.error(e)
            // append error box to form with "oops something went wrong"
            }
        })
}

// function to get a user from the api

const getUserFromApi = () => {



}


const getRegions = () => fetch(REGIONURL).then(resp => resp.json())

const storeRegions = (regions) =>{
   allRegions.push(regions)
   let randomNum = randValue()
   setTarget(randomNum, state)
}


















//
