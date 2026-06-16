import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA3mNf_zLjsF_ACWQce75SoMJkVWQ0JSI8",
  authDomain: "jesus-tem-sua-resposta.firebaseapp.com",
  projectId: "jesus-tem-sua-resposta",
  storageBucket: "jesus-tem-sua-resposta.firebasestorage.app",
  messagingSenderId: "1013292935764",
  appId: "1:1013292935764:web:a5befb30673a405a019bc1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const messaging =
  typeof window !== "undefined"
    ? getMessaging(app)
    : null;