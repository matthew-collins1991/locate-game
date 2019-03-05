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