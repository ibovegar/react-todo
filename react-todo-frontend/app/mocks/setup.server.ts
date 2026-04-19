import { server } from "./node";

if (!globalThis.__mswStarted) {
	server.listen({ onUnhandledRequest: "bypass" });
	globalThis.__mswStarted = true;
	console.log("🔶 MSW server started");
}
