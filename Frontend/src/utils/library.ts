import { ResponseMsg } from "./typess"

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

/**
 * 
 * 
 */
export const fetchDisconnect = () => {
    let url = `${PRODUCTION}/logout`

    let options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("VAToken") || ""}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    return new Promise<ResponseMsg>(async (resolve, reject) => {

        try {
            let response = await fetch(url, options)
            let data: ResponseMsg = await response.json()

            resolve(data)

        } catch (err) {
            resolve({
                status: 404,
                message: "System error",
                content: { err }
            })
        }

    })
}

/**
 * 
 * 
 */
export const fetchLogin = async (email: string, pwd: string) => {
    let url = `${PRODUCTION}/login/`
    let options = {
        method: 'POST',
        headers: {

            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            email: email,
            pwd: pwd
        }),

    }


    return new Promise<ResponseMsg>(async (resolve, reject) => {

        try {

            let response = await fetch(url, options)
            let data: ResponseMsg = await response.json()

            resolve(data)

        } catch (err) {
            resolve({
                status: 404,
                message: "System error",
                content: { err }
            })
        }

    })

}

/**
 * 
 * Assume that the input is well formatted, return the response of the register endpoint with the given arguments.
 */
export const fetchReg = async (email: string, pwd: string): Promise<ResponseMsg> => {
    let URL = `${PRODUCTION}/register/`

    let options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("VAToken") || ""}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            email: email,
            pwd: pwd
        }),

    }

    return new Promise<ResponseMsg>(async (resolve, reject) => {

        try {
            let response = await fetch(URL, options)
            let data: ResponseMsg = await response.json()

            if (data.message != "Success") {
                console.log('HERE');

                reject({
                    status: data.status,
                    message: data.message,
                    content: data.content
                })
                return
            }
            resolve(data)

        } catch (err) {
            reject({
                status: 404,
                message: "System error",
                content: { err }
            })
        }

    })

}

/**
 * Check if string contain special characters
 */

const containSpecialCharacter = (str: string): boolean => {

    /**
     * /.../ mark the beginning and the end of the regex
     * \ escape character
     * [...] define a character class
     * 
     */
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/

    return regex.test(str);;
}

/**
 * Verify Correctness of an email addresses 
 * test@test.com
 */
export const checkEmail = (email: string, callback: React.Dispatch<React.SetStateAction<string>> | undefined = undefined): boolean => {
    let [head, provider] = email.split("@");
    if (!head || !provider || containSpecialCharacter(provider)) {
        if (callback) callback("Invalid email");
        return false;
    }

    let domainSplit = provider.split(".");
    if (domainSplit.length < 2) {
        if (callback) callback("Invalid email");
        return false;
    }
    for (let subdomain of domainSplit) {
        if (subdomain == "") {
            if (callback) callback("Invalid email");
            return false;
        }
    }

    if (callback) callback(" ");
    return true;
}

/**
 * Verify Correctness of the password
 * Password needs to ba a least 4 characters long.
 */
export const checkPassword = (password: string, callback: React.Dispatch<React.SetStateAction<string>> | undefined = undefined): boolean => {

    if (password.length < 4) {
        if (callback) callback("Invalid password");
        return false;
    }

    if (callback) callback(" ");
    return true;
}

