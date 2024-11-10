import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import { stadiums } from './dataFile/stadiums';
// import { teams } from './dataFile/teams';
import { matchs } from './dataFile/matchs';

async function main() {
    for (const match of matchs) {
        await prisma.match.create({
            data: match,
        });
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });


