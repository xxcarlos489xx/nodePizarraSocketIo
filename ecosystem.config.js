  module.exports = {
    apps: [
      {
        name: 'pizarra',
        exec_mode: 'cluster',
        instances: 1, // Or a number of instances
        script: './server.js',
        watch:true,
        env_production: {
            NODE_ENV: "production",
            HOST: "run.dmqvirucida.com.pe",
            PORT: "3500",
        }
      }
    ]
  }