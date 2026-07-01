import {
    initializeApp, getApps, getApp, App, cert
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";




// if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
//   serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
// } else {
//   serviceKey = require("./service_key.json");
// }

const serviceKey = require("@/service_key.json");
// const serviceKey = JSON.parse(
//     process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
// );

// let serviceKey: any = {};
// if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
//     try {
//         serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
//     } catch (e) {
//         console.warn("Warning: Could not parse FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
//     }
// } else {
//     try {
//         serviceKey = require("./service_key.json");
//     } catch (e) {
//         // Fallback for build environment where service key might not be required
//     }
// }

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey as any)
    })
} else {
    app = getApp()
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };