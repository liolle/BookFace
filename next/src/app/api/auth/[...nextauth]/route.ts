import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { ResponseMsg } from "../../../../../utils/types"
import { Jwt } from "jsonwebtoken"
export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [

        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                pwd: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("https://book-face-backend.vercel.app/login/", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const { content } = await res.json()

                if (!content) return null

                const [headerBase64Url, payloadBase64Url, signature] = content.split('.');

                const payloadJSON = Buffer.from(payloadBase64Url, 'base64').toString('utf-8');
                const payload = JSON.parse(payloadJSON);
                
                let user = {
                    id: payload.id,
                    teg: payload.user_tag,
                    email: payload.email
                }

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
        // ...add more providers here
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }