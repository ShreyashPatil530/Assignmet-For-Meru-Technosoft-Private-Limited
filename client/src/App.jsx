import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Archive, RefreshCcw, CreditCard, Calendar, User, FileText } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [invoice, setInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const invoiceId = 1; // Default for assignment simplicity

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`${API_BASE}/invoices/${invoiceId}`);
      setInvoice(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/invoices/${invoiceId}/payments`, {
        amount: parseFloat(paymentAmount),
      });
      setIsModalOpen(false);
      setPaymentAmount('');
      fetchInvoice();
    } catch (err) {
      alert(err.response?.data?.error || 'Payment failed');
    }
  };

  const handleArchive = async () => {
    try {
      await axios.post(`${API_BASE}/invoices/${invoiceId}/archive`);
      fetchInvoice();
    } catch (err) {
      alert('Archive failed');
    }
  };

  const handleRestore = async () => {
    try {
      await axios.post(`${API_BASE}/invoices/${invoiceId}/restore`);
      fetchInvoice();
    } catch (err) {
      alert('Restore failed');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!invoice) return <div className="container">Invoice not found</div>;

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <div className="invoice-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <FileText size={16} />
              <span>#{invoice.invoiceNumber}</span>
            </div>
            <h1>{invoice.customerName}</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span className={`status-badge ${invoice.status === 'PAID' ? 'status-paid' : 'status-draft'}`}>
              {invoice.status}
            </span>
            <button className="btn" onClick={invoice.isArchived ? handleRestore : handleArchive} title={invoice.isArchived ? "Restore" : "Archive"}>
              {invoice.isArchived ? <RefreshCcw size={18} /> : <Archive size={18} />}
            </button>
          </div>
        </header>

        <div className="details-grid">
          <div className="detail-item">
            <label><Calendar size={12} style={{ marginRight: '4px' }} /> Issue Date</label>
            <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <label><Calendar size={12} style={{ marginRight: '4px' }} /> Due Date</label>
            <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>${item.lineTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Amount Paid</span>
            <span>${invoice.amountPaid.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Balance Due</span>
            <span>${invoice.balanceDue.toFixed(2)}</span>
          </div>
        </div>

        <section className="payments-section">
          <div className="payments-header">
            <h3>Payment History</h3>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} disabled={invoice.balanceDue === 0}>
              <Plus size={18} style={{ marginRight: '8px' }} /> Add Payment
            </button>
          </div>
          {invoice.payments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {invoice.payments.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: 600 }}>Payment Received</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(p.paymentDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700 }}>+ ${p.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No payments recorded yet.</div>
          )}
        </section>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Payment</h2>
            <form onSubmit={handleAddPayment}>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  max={invoice.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder={`Max: $${invoice.balanceDue}`}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
