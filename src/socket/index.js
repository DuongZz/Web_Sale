import { env } from "~/config/environment";

let onlineAdmin = [];
let onLineUser = [];
export const onConnect = (socket) => {
  const domain = socket.handshake.headers.origin;
  if (domain === env.REACT_GEARVN_ADMIN_HOST) onlineAdmin.push(socket.io);
  if (domain === env.REACT_GEARVN_CLONE_HOST) onLineUser.push(socket.io);
};
