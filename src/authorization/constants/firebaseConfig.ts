import admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'coffmunity',
    privateKey:'',     
    clientEmail: '',
  }),
});
