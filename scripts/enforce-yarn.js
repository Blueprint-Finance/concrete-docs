const ua = process.env.npm_config_user_agent || "";

if (!ua.startsWith("yarn/")) {
  console.error("\nThis project requires Yarn for all installs.");
  console.error("Run: yarn install\n");
  process.exit(1);
}
