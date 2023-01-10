export const firebaseConfig = {
  apiKey: 'AIzaSyAvv4owCrOrViLA0am_h0Ff2vM-Y-CFPag',
  urlLogin: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
  urlCadastro: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
};

/**
 Exemplo do Jean:
 * export const firebaseConfig = {
  apiKey: "AIzaSyBS8WDa8P24C_lHpcFvGX8kE0XS3mGn-A0",
  authDomain: "impulsionar-ecc6a.firebaseapp.com",
  projectId: "impulsionar-ecc6a",
  storageBucket: "impulsionar-ecc6a.appspot.com",
  messagingSenderId: "872696205264",
  appId: "1:872696205264:web:2101b868d749841b2173d5",
};

url originais que usei antes em FormularioAuth:
Login `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${chaveAuth}`
Cadastro `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${chaveAuth}`
 */
