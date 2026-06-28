import{
    initializeApp, getApps, getApp, App, cert
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "@/service_key.json";


// if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
//   serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
// } else {
//   serviceKey = require("./service_key.json");
// }
// const serviceKey = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
// );

let app:App;

if(getApps().length===0){
    app=initializeApp({
        credential: cert(serviceKey as any)
    })
}else{
    app=getApp()
}

const adminDb= getFirestore(app);

export {app as adminApp, adminDb};