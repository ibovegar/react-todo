import { setupServer } from "msw/node";
import { handlers } from "./handlers";

declare global {
	var __mswServer: ReturnType<typeof setupServer> | undefined;
	var __mswStarted: boolean | undefined;
}

if (!globalThis.__mswServer) {
	globalThis.__mswServer = setupServer(...handlers);
}

export const server = globalThis.__mswServer;

server.resetHandlers(...handlers);
