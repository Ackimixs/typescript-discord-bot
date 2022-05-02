import { Command } from "../interfaces/Command";
import { taskPost } from './taskPost'
import { taskGet } from './taskGet'
import { ping } from './ping'
import { removeTask } from "./removeTask";

export const CommandList: Command[] = [taskPost, taskGet, ping, removeTask];
