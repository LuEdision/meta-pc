// 设置请求头cookie到process中
export default function ({ req }) {
  if (process.server) {
    process.host = req.headers.host;
  }
}
