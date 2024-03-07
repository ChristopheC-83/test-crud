import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { getServerSession } from "next-auth/next";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {}, //on le fera à la main nous mêmes
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          // recherche utilisateur
          let user = await prisma.users.findFirst({
            where: {
              email,
            },
          });
          console.log("user", user); // infos seulement là pour la connexion
          // pour les avoir à disposition, on passe par les callbacks
          if (!user) {
            throw new Error("Cet email n'existe pas");
          }
          // validation mdp
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
          }
          console.log("user", user);

          await prisma.$disconnect();
          return { ...user, email: user.email };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    "email",
    // gooogle, github....
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/connection",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user;
      return session;
    },
  },
};

// on envoie l'objet user créé à nextauth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// recupère la session pour utilisation coté serveur
export const getAuthSession = () => getServerSession(authOptions);
