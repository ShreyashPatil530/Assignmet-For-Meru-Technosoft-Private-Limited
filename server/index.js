const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// 1. Get Invoice Details
app.get('/api/invoices/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: parseInt(id) },
            include: {
                lineItems: true,
                payments: true,
            },
        });

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Add Payment
app.post('/api/invoices/:id/payments', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: parseInt(id) },
        });

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        if (amount > invoice.balanceDue) {
            return res.status(400).json({ error: 'Amount exceeds balance due' });
        }

        const updatedAmountPaid = invoice.amountPaid + amount;
        const updatedBalanceDue = invoice.total - updatedAmountPaid;
        const updatedStatus = updatedBalanceDue === 0 ? 'PAID' : invoice.status;

        const [payment, updatedInvoice] = await prisma.$transaction([
            prisma.payment.create({
                data: {
                    invoiceId: parseInt(id),
                    amount: amount,
                },
            }),
            prisma.invoice.update({
                where: { id: parseInt(id) },
                data: {
                    amountPaid: updatedAmountPaid,
                    balanceDue: updatedBalanceDue,
                    status: updatedStatus,
                },
            }),
        ]);

        res.json({ payment, invoice: updatedInvoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Archive Invoice
app.post('/api/invoices/:id/archive', async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await prisma.invoice.update({
            where: { id: parseInt(id) },
            data: { isArchived: true },
        });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Restore Invoice
app.post('/api/invoices/:id/restore', async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await prisma.invoice.update({
            where: { id: parseInt(id) },
            data: { isArchived: false },
        });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
