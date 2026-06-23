import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const workspaces = [
  "apps/mobile_app",
  "apps/merchant_portal",
  "apps/admin_portal",
  "packages/design_system",
  "packages/localization",
  "packages/common_widgets",
];

const action = process.argv[2];

const run = (command, args, cwd) => {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error !== undefined) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

if (action === undefined) {
  console.error(
    "Usage: node tools/run-flutter-workspace.mjs <pub-get|analyze|test|format>",
  );
  process.exit(1);
}

for (const workspace of workspaces) {
  if (!existsSync(workspace)) {
    continue;
  }

  console.log(`\n==> ${action} ${workspace}`);
  if (action === "pub-get") {
    run("flutter", ["pub", "get"], workspace);
    continue;
  }

  if (action === "analyze") {
    run("flutter", ["analyze"], workspace);
    continue;
  }

  if (action === "test") {
    run("flutter", ["test"], workspace);
    continue;
  }

  if (action === "format") {
    const targets = ["lib", "test"].filter((target) =>
      existsSync(`${workspace}/${target}`),
    );
    if (targets.length === 0) {
      continue;
    }
    run(
      "dart",
      ["format", "--output=none", "--set-exit-if-changed", ...targets],
      workspace,
    );
    continue;
  }

  console.error(`Unsupported action: ${action}`);
  process.exit(1);
}
