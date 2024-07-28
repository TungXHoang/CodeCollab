import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import {io, Socket} from "socket.io-client";
import { IAuthUser } from "../types/auth";

interface ServerToClientEvents {
  getMessage: (data: any) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: { receiverId: string; data: any }) => void;
	newUser: (id: string) => void;
	getOnlineUsers: (callback: (user:any)=>void) => void
}


type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface ISocketProvider {
	socket: ISocket | undefined, 
	onlineUsers: IAuthUser[],
}

export const SocketContext = createContext<ISocketProvider | undefined>(undefined);

export const useSocketContext = () => {
  const context =  useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children } : {children: ReactNode}) => {
	const [socket, setSocket] = useState < ISocket>();
	const [onlineUsers, setOnlineUsers] = useState<IAuthUser[]>([]);
	const user = useAuthContext();

	useEffect(() => {
		if (user) {
			const socket = io("http://localhost:8080", {
				query: {
					userId: user._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users: IAuthUser[]) => {
				setOnlineUsers(users);
			});

			return () => {
				socket.close();
			};

		} else {
			if (socket) {
				socket.close();
				setSocket(undefined);
			}
		}
	}, [user]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

