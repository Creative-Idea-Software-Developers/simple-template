import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mysql from 'mysql2/promise'

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Usuario", type: "text", placeholder: "admin@domain.com" },
          password: {  label: "Contraseña", type: "password" }
        },
        async authorize(credentials, req) {
          const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'datacenter'
          })
          let [rows, fields] = await connection.execute('SELECT * FROM users WHERE username = \''+credentials.username+'\' AND password = \''+credentials.password+'\';');
          if(rows.length>0){
            let user = rows[0];
            if(user.password === credentials.password){
              return user
            } else {
              return null
            }
          } else {
            return null
          }
        }
      })
  ],
  pages: {
      signIn: '/login',
  },
  jwt: {
    expiresIn: '7d'
  }
}

export default NextAuth(authOptions)