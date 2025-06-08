import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDB from '@/db/connnectdb';

export const authoptions =  NextAuth({
  
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
     GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try{
        if(account.provider === 'github'){
         await connectDB();      
        const currentuser = await User.findOne({email : user.email})
        if(!currentuser){
        await User.create({
            email : user.email, 
            name : user.name,
            username : user.email.split('@')[0],
            profilepic : user.image
          })   
        }
        return true
      }
      if(account.provider === 'google'){
        await connectDB();    
        const currentuser = await User.findOne({email : user.email})
        if(!currentuser){
         await User.create({
            email : user.email, 
            name : user.name,
            username : user.email.split('@')[0],
            profilepic : user.image
          })   
        }
        return true
      }}catch(err){
        console.log("Something went wrong!!!")
      }
    },
    async session({ session, token, user }) {
    try{ await connectDB();
    const Dbuser =  await User.findOne({email : session.user.email})
    session.user.name = Dbuser?.name
    session.user.username = Dbuser?.username
    session.user.image = Dbuser?.profilepic
    session.user.coverimg = Dbuser?.coverpic
    if(!Dbuser) {return null}
    return session }
    catch(error){
      console.log("User not found")
    }
  }
  }
})


export { authoptions as GET, authoptions as POST }