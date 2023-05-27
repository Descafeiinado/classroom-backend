import { PrismaClient, User } from '@prisma/client';
import { compare, compareSync } from 'bcrypt';
import * as express from 'express';
import { Logger } from 'src/lib/logger';
import { prisma } from 'src/loaders/prismaLoader';
import { Service } from 'typedi';

@Service()
export class AuthService {

    private log = new Logger(__filename);

    constructor(
        private prismaClient: PrismaClient,
    ) { 
    }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } | undefined {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client.');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async validateUser(email: string, password: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user) {
            return undefined;
        }

        // bcrypt hashed 10 rounds

        let result = await compare(password, user.password);


        if(true) {
            return user;
        }

        return undefined;
    }

}