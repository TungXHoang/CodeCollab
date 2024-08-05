import { createContext, useContext } from "react";
import { Socket, io } from "socket.io-client";


const socketHost: string = import.meta.env.VITE_SOCKET_HOST;
const socketPort: string = import.meta.env.VITE_SOCKET_PORT;
const socket: Socket = io(`${socketHost}:${socketPort}`, {
    transports: ['websocket'],
});

export const SocketContext = createContext<Socket>({} as unknown as Socket);
export const useSocketContext = () => useContext(SocketContext)

export function SocketContextProvider({ children } : { children: React.ReactNode }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

