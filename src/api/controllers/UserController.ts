import { User } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Request } from "express";
import { Authorized, Get, JsonController, Req } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Logger } from "src/lib/logger";
import { prisma } from "src/loaders/prismaLoader";

const log = new Logger(__filename);

class BaseUser {

    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @IsNotEmpty()
    public name!: string;
}

export class UserResponse extends BaseUser {

    @IsNumber()
    public id!: number;

    // grade
    @IsNumber()
    public grade!: number;

}

class CreateUserBody extends BaseUser {

    @IsNotEmpty()
    public password: string;
}


@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {
    constructor(
    ) { }


    @Get()
    @ResponseSchema(UserResponse, { isArray: true })
    public async find(@Req() request: Request): Promise<User[]> {

        // Who is requesting this?
        const user = request.us as User;

        log.info('Find all users');
        return prisma.user.findMany() ;
    }
}