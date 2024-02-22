cd "${1}" || exit 1
cd "${2}" || exit 1
cd dist || exit 1
/usr/local/bin/http-server -p "${3}" > "${PWD}/my_server_log.txt"
