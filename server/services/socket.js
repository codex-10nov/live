import { Server } from "socket.io";

class SocketService {
    #io;
    constructor() {
        console.log("Socket server is running");
        this.#io = new Server();
    }

    get io() {
        return this.#io;
    }

    initListeners() {
        console.log("Initialize socket listeners")
        this.#io.on("connection", (socket) => {
            console.log("New client connected");
            socket.on("create", (data) => {
                console.log(data);
                this.#io.emit("create", data);
            })
            socket.on("update", (data) => {
                console.log(data);
                this.#io.emit("update", data);
            })
            socket.on("delete", (data) => {
                console.log(data);
                this.#io.emit("delete", data);
            })
            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }
}

export default SocketService;