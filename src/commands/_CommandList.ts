import { Command } from "../interfaces/Command";
import { taskPost } from './taskPost'
import { taskGet } from './taskGet'
import { ping } from './ping'
import { removeTask } from "./removeTask";
import { setGoodbyeMessage } from "./setGoodbyeMessage";
import { setWelcomeMessage } from "./setWelcomeMessage";

export const CommandList: Command[] = [taskPost, taskGet, ping, removeTask, setGoodbyeMessage, setWelcomeMessage];
