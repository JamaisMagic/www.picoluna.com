const APP_NAME = 'www.picoluna.com';
const ports = [8000, 8001, 8002, 8003];
let apps = [];

for (let [index, port] of ports.entries()) {
    apps.push({
        name: `${APP_NAME}:${port}`,
        script: `/data/app/${APP_NAME}/bin/www`,
        cwd: `/data/app/${APP_NAME}`,
        instances: 1,
        exec_mode: 'cluster',
        watch: false,
        ignore_watch: [],
        wait_ready: true,
        listen_timeout: 5000,
        kill_timeout: 5000,
        env: {
            NODE_ENV: 'development',
            PORT: port
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: port
        },
        env_local: {
            NODE_ENV: 'local',
            PORT: port
        },
        error_file: `/data/log/${APP_NAME}/error.log`,
        out_file: `/data/log/${APP_NAME}/out.log`,
        combine_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z'
    });
}

module.exports = {
    apps
};
