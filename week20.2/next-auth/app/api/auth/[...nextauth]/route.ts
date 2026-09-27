import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        console.log("Login attempt for:", username);

        // 1. Add your database logic here to verify the user
        // Example: const dbUser = await db.user.findUnique({ where: { username } })
        
        // 2. Validate the password (use bcrypt or similar in production)
        // Example: const isValid = await bcrypt.compare(password, dbUser.passwordHash)
        
        // --- MOCK VALIDATION FOR TESTING ---
        if (username === "jsmith" && password === "password123") {
          // 3. Return a user object (MUST contain an 'id' string)
          // DO NOT include the password in this returned object!
          return {
            id: "1", 
            name: "John Smith",
            email: "jsmith@example.com",
          }
        }

        // Return null if user data could not be retrieved / invalid password
        return null;
      }
    })
  ],
  // Add a secret key for JWT encryption (Required for production)
  secret: process.env.NEXTAUTH_SECRET,
  
  // Optional: Custom pages (if you build your own login UI later)
  // pages: {
  //   signIn: '/login',
  // },
})

export { handler as GET, handler as POST }