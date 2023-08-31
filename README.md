# Possup Chat App

Possup is a real-time chat application that allows users to engage in seamless conversations. This project is built using modern web technologies, including Next.js, TypeScript, Tailwind CSS, Firebase SDK, NextAuth.js, and Material-UI (MUI).

![Possup Chat App](https://possup.vercel.app/chat-app.jpeg)

## Features

- **Real-time Messaging:** Engage in real-time conversations with friends and family.
- **User Authentication:** Secure authentication powered by NextAuth.js and Firebase authentication.
- **Rich User Experience:** Smooth and intuitive user interface for an enhanced chatting experience.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated applications.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that helps improve code quality and developer productivity.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Firebase SDK](https://firebase.google.com/): Google's platform for developing web and mobile applications, providing services like real-time database, authentication, and more.
- [NextAuth.js](https://next-auth.js.org/): An authentication library for Next.js applications.
- [Material-UI (MUI)](https://mui.com/): A popular React UI framework for building modern and visually appealing user interfaces.

## Getting Started

Follow these steps to get the Possup Chat App up and running on your local machine:

1. **Clone Repository:** Begin by cloning this repository to your local machine using the following command:

```javascript
git clone https://github.com//haseeb196/chat-app.git
```

2. **Install Dependencies:** Navigate to the project directory and install the required dependencies using npm or yarn:

```javascript
cd chat-app
npm install
or
yarn install
```

3. **Firebase Setup:** Create a Firebase project and obtain the necessary configuration details. Update the Firebase configuration in the project. first Rename firebase.ts.example to firebase.ts then add your Firebase project's configuration to the `firebaseConfig` object in the `src/utils/firebase.ts` file.

4. **Environment Variables:** Rename the `.env.example` file to `.env` and fill in the following environment variables:

```plaintext
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
```

5. **Start Server** Start Development Server: Start the development server by running the following command:

```javascript
npm run dev
# or
yarn dev
```

## Contribution

Contributions to Possup Chat App are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request. Please make sure to follow the project's code of conduct.

Happy chatting with Possup! If you encounter any issues or have questions, feel free to reach out.
