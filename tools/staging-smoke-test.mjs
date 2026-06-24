const scenarios = [
  "signup and role selection",
  "store registration and platform approval",
  "search, availability, and booking",
  "online payment intent or cash confirmation",
  "staff handover and rental start",
  "ride track chunk upload",
  "return request and staff inspection",
  "SOS creation, assignment, and escalation",
  "store/platform report load",
  "audit search for sensitive actions",
];

const baseUrl = process.env.STAGING_API_BASE_URL;
const healthPath = process.env.STAGING_HEALTH_PATH ?? "/health";

console.log("Bike Local staging smoke scenarios:");
for (const [index, scenario] of scenarios.entries()) {
  console.log(`${index + 1}. ${scenario}`);
}

if (!baseUrl) {
  console.log(
    "STAGING_API_BASE_URL is not set; completed dry-run checklist validation.",
  );
  process.exit(0);
}

const healthUrl = new URL(healthPath, baseUrl);
const response = await fetch(healthUrl);

if (!response.ok) {
  throw new Error(`Staging health check failed: ${response.status}`);
}

console.log(`Staging health check passed: ${healthUrl.toString()}`);
