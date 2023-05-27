import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

// prisma client
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const prismaLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        settings.setData('prisma', prisma);
        settings.onShutdown(() => prisma.$disconnect());
    }
};