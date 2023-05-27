import { PrismaClient, User } from "@prisma/client";
import { Action } from "routing-controllers";

export function currentUserChecker(connection: PrismaClient): (action: Action) => Promise<User | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        return action.request.user;
    };
}