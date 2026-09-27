import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

export function getCalendarClient() {
  const email =
    process.env.GOOGLE_SERVICE_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  let privateKey =
    process.env.GOOGLE_SERVICE_PRIVATE_KEY ||
    process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error(
      "Missing Google Service Account credentials (GOOGLE_SERVICE_EMAIL or GOOGLE_SERVICE_PRIVATE_KEY)"
    );
  }

  // Handle potential quotes and escaped newlines in .env
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.calendar({ version: "v3", auth });
}
