import { PrismaClient } from './node_modules/.prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing DB connection...');
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Users found:', users.length);
    
    const assistants = await prisma.businessAssistant.findMany({ take: 1 });
    console.log('Assistants found:', assistants.length);
    
    const leads = await prisma.lead.findMany({ take: 1 });
    console.log('Leads found:', leads.length);
    
    console.log('DB connection successful!');
  } catch (error) {
    console.error('DB Connection Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
