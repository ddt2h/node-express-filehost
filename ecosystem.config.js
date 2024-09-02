module.exports = {
    apps: [
      {
        name: "my-typescript-app",
        script: "ts-node",
        args: "src/main.ts", // Replace with the path to your entry TypeScript file
        watch: true,
        ignore_watch: ["node_modules"],
        instances: 1,
        autorestart: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };