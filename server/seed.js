const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.payment.deleteMany();
  await prisma.invoiceLine.deleteMany();
  await prisma.invoice.deleteMany();

  // Create an invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-001',
      customerName: 'John Doe',
      issueDate: new Date('2024-02-01'),
      dueDate: new Date('2024-03-01'),
      status: 'DRAFT',
      total: 1000,
      amountPaid: 200,
      balanceDue: 800,
      isArchived: false,
      lineItems: {
        create: [
          {
            description: 'Web Design Service',
            quantity: 1,
            unitPrice: 600,
            lineTotal: 600,
          },
          {
            description: 'Logo Design',
            quantity: 1,
            unitPrice: 400,
            lineTotal: 400,
          },
        ],
      },
      payments: {
        create: [
          {
            amount: 200,
            paymentDate: new Date('2024-02-05'),
          },
        ],
      },
    },
  });

  console.log('Seed data created:', invoice);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
