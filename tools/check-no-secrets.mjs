import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".dart_tool",
  ".firebase",
  "coverage",
  "generated",
]);
const ignoredFiles = new Set([
  "package-lock.json",
  "check-no-secrets.mjs",
  ".env.example",
]);
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".dart",
  ".env",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);

const denyPatterns = [
  {
    name: "private key block",
    pattern: new RegExp("-----BEGIN " + "PRIVATE KEY-----"),
  },
  {
    name: "Google API key",
    pattern: /AIza[0-9A-Za-z\-_]{20,}/,
  },
  {
    name: "Stripe secret key",
    pattern: /sk_(?:live|test)_[0-9A-Za-z]{16,}/,
  },
  {
    name: "GitHub personal access token",
    pattern: /ghp_[0-9A-Za-z]{20,}/,
  },
  {
    name: "Slack bot token",
    pattern: /xoxb-[0-9A-Za-z-]{20,}/,
  },
  {
    name: "Firebase service account key file",
    pattern:
      /firebase-adminsdk-[0-9a-z-]+@[0-9a-z-]+\.iam\.gserviceaccount\.com/i,
  },
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
      continue;
    }

    if (!entry.isFile() || ignoredFiles.has(entry.name)) {
      continue;
    }

    if (
      textExtensions.has(path.extname(entry.name)) ||
      entry.name === ".firebaserc"
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await listFiles(root);
const findings = [];

for (const file of files) {
  const metadata = await stat(file);

  if (metadata.size > 1_000_000) {
    continue;
  }

  const content = await readFile(file, "utf8");
  const relativePath = path.relative(root, file);

  for (const { name, pattern } of denyPatterns) {
    if (pattern.test(content)) {
      findings.push(`${relativePath}: ${name}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Potential committed secrets found:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log(
  `No committed secret patterns found in ${files.length} text files.`,
);
