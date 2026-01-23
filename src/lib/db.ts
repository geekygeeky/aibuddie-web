import { init } from "@instantdb/react";

// ID for app: aibuddie
const APP_ID = import.meta.env.VITE_INSTANT_APP_ID;
export const db = init({ appId: APP_ID });