import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../Constant/axiosInstance';

const formatMoney = (naira) => new Intl.NumberFormat('en-NG', {
  style: 'currency', currency: 'NGN', maximumFractionDigits: 0
}).format(naira || 0);

export default function Payments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState(null);
  const [seats, setSeats] = useState(50);
  const [additionalSeats, setAdditionalSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [referenceInput, setReferenceInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const baseAmount = useMemo(() => {
    if (summary?.paymentMode === 'PremiumInstallment') return summary.paymentBaseAmountDue || summary.termAmountDue || 0;
    if (summary?.paymentMode === 'UpgradeOnly') return Math.max(0, Number(additionalSeats) || 0) * 400;
    return Math.max(0, Number(seats) || 0) * 400;
  }, [summary, seats, additionalSeats]);

  const amount = useMemo(() => {
    if (!baseAmount) return 0;
    const percent = Number(summary?.feePercentage ?? 1.5);
    const percentageOnlyTotal = Math.round(((baseAmount / (1 - percent / 100)) + 0.01) * 100) / 100;
    const fixedFee = percentageOnlyTotal < 2500 ? 0 : Number(summary?.feeFixedAmount ?? 100);
    const cap = Number(summary?.feeCapAmount ?? 2000);
    const applicableFee = baseAmount * percent / 100 + fixedFee;
    const calculatedTotal = Math.round((((baseAmount + fixedFee) / (1 - percent / 100)) + 0.01) * 100) / 100;
    return applicableFee > cap || calculatedTotal - baseAmount > cap
      ? baseAmount + cap
      : calculatedTotal;
  }, [baseAmount, summary]);

  const paymentHistory = useMemo(() => [...(summary?.payments ?? [])].sort((a, b) => {
    const dateA = Date.parse(a.paidAt || a.dateCreated || '');
    const dateB = Date.parse(b.paidAt || b.dateCreated || '');
    return (Number.isFinite(dateB) ? dateB : 0) - (Number.isFinite(dateA) ? dateA : 0);
  }), [summary?.payments]);

  const verifyReference = async (reference) => {
    const normalizedReference = reference.trim();
    if (!normalizedReference) {
      setError('Enter the Paystack reference from your payment receipt.');
      return;
    }
    setVerifying(true);
    setMessage('Checking payment with Paystack…');
    setError('');
    try {
      const verification = await axiosInstance.post('/api/v1/Subscription/verify-payment', { reference: normalizedReference });
      await loadSummary();
      setMessage(verification.data.message || 'Payment confirmed.');
      setReferenceInput('');
    } catch (requestError) {
      setMessage('');
      setError(requestError.response?.data?.message || requestError.response?.data || 'Payment is not confirmed yet. Check the reference and try again.');
    } finally {
      setVerifying(false);
    }
  };

  const loadSummary = async () => {
    const response = await axiosInstance.get('/api/v1/Subscription/payment-summary');
    setSummary(response.data);
    setSeats(Math.max(response.data.allowedStudentCount || 0, response.data.minimumStudentCapacity));
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const reference = searchParams.get('reference');
        if (reference) {
          setMessage('Confirming your payment with Paystack…');
          const verification = await axiosInstance.post('/api/v1/Subscription/verify-payment', { reference });
          if (mounted) {
            setMessage(verification.data.message || 'Payment confirmed.');
            setSearchParams({}, { replace: true });
          }
        }
        const response = await axiosInstance.get('/api/v1/Subscription/payment-summary');
        if (mounted) {
          setSummary(response.data);
          setSeats(Math.max(response.data.allowedStudentCount || 0, response.data.minimumStudentCapacity));
        }
      } catch (requestError) {
        if (mounted) setError(requestError.response?.data?.message || requestError.response?.data || 'Unable to load or verify payment details. Try again.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const startPayment = async (event) => {
    event.preventDefault();
    setPaying(true);
    setError('');
    setMessage('');
    try {
      const response = await axiosInstance.post('/api/v1/Subscription/initialize-payment', {
        studentCapacity: Number(seats),
        additionalSeats: Number(additionalSeats)
      });
      window.location.assign(response.data.authorizationUrl);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.response?.data || 'Unable to start payment. Try again.');
      setPaying(false);
    }
  };

  const checkPendingPayment = async (reference) => {
    setMessage('Checking payment with Paystack…');
    setError('');
    try {
      await verifyReference(reference);
    } catch (requestError) {
      setMessage('');
      setError(requestError.response?.data?.message || requestError.response?.data || 'Payment is not confirmed yet. Try again shortly.');
    }
  };

  if (loading) return <div className="p-8 text-gray-600">Loading payment details…</div>;

  return (
    <main className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">School subscription</h1>
      <p className="mt-2 text-gray-600">Pay securely with Paystack. Each student seat costs ₦400 and gives your school four months of access.</p>

      {message && <div className="mt-5 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">{message}</div>}
      {error && <div className="mt-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">{typeof error === 'string' ? error : 'Payment could not be confirmed. Please retry.'}</div>}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active students</p>
          <p className="mt-2 text-3xl font-bold">{summary?.activeStudentCount ?? 0}</p>
        </section>
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Current seat allowance</p>
          <p className="mt-2 text-3xl font-bold">{summary?.allowedStudentCount ?? 0}</p>
        </section>
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Subscription expires</p>
          <p className="mt-2 text-lg font-semibold">{summary?.expiryDate ? new Date(summary.expiryDate).toLocaleDateString() : 'Not active'}</p>
        </section>
      </div>

      <form onSubmit={event => { event.preventDefault(); verifyReference(referenceInput); }} className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">Payment made, but subscription not updated?</h2>
        <p className="mt-1 text-sm text-gray-600">Enter the transaction reference from Paystack’s successful payment email or receipt. We’ll verify it with Paystack and update this school’s subscription.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="paystack-reference" className="sr-only">Paystack transaction reference</label>
          <input id="paystack-reference" type="text" value={referenceInput} onChange={event => setReferenceInput(event.target.value)}
            placeholder="Paystack transaction reference" autoComplete="off" required
            className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
          <button type="submit" disabled={verifying || !referenceInput.trim()}
            className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
            {verifying ? 'Verifying…' : 'Verify payment'}
          </button>
        </div>
      </form>

      {summary?.paymentMode === 'Lifetime' ? (
        <section className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
          {summary.targetAmount > 0
            ? `The premium target of ${formatMoney(summary.targetAmount)} has been reached. No further term payments are due.`
            : 'This is a lifetime subscription and has no payment due.'}
        </section>
      ) : summary?.paymentMode === 'Unavailable' ? (
        <section className="mt-6 rounded-xl border bg-white p-5 text-gray-700">This demo subscription cannot be paid through this page.</section>
      ) : (
        <form onSubmit={startPayment} className="mt-6 rounded-xl border bg-white p-5 md:p-7 shadow-sm">
          <h2 className="text-lg font-semibold">
            {summary?.paymentMode === 'PremiumInstallment' ? 'Premium instalment' : summary?.paymentMode === 'UpgradeOnly' ? 'Add student seats' : 'Renew subscription'}
          </h2>
          {summary?.paymentMode === 'PremiumInstallment' ? (
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Paid so far: {formatMoney(summary.amountPaid)} of {formatMoney(summary.targetAmount)}</p>
              <p>Remaining target: {formatMoney(summary.remainingTargetAmount)}</p>
              <p>Due now ({summary.termPaymentPercentage}%): {formatMoney(summary.paymentAmountDue)}</p>
              <p>Payment due date: {summary.paymentDueDate ? new Date(summary.paymentDueDate).toLocaleDateString() : '—'}</p>
            </div>
          ) : summary?.paymentMode === 'UpgradeOnly' ? (
            <>
              <p className="mt-1 text-sm text-gray-600">This payment adds seats to your current allowance. It will not change your expiry date ({summary?.expiryDate ? new Date(summary.expiryDate).toLocaleDateString() : '—'}). No 50-seat minimum applies to upgrades.</p>
              <label htmlFor="additional-seat-count" className="mt-5 block text-sm font-medium text-gray-700">Additional student seats</label>
              <input id="additional-seat-count" type="number" min="1" step="1" value={additionalSeats}
                onChange={event => setAdditionalSeats(event.target.value)} required
                className="mt-2 w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
            </>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-600">Minimum for renewal: {summary?.minimumStudentCapacity ?? 50} total seats.</p>
              <label htmlFor="seat-count" className="mt-5 block text-sm font-medium text-gray-700">Total student seats after renewal</label>
              <input id="seat-count" type="number" min={summary?.minimumStudentCapacity ?? 50} step="1" value={seats}
                onChange={event => setSeats(event.target.value)} required
                className="mt-2 w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
            </>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatMoney(amount)}</p>
              <p className="mt-1 text-xs text-gray-500">Includes estimated Paystack fee of {formatMoney(amount - baseAmount)} on {formatMoney(baseAmount)} subscription payment.</p>
            </div>
            <button type="submit" disabled={paying || (summary?.paymentMode === 'UpgradeOnly' ? Number(additionalSeats) < 1 : summary?.paymentMode === 'Renewal' && Number(seats) < (summary?.minimumStudentCapacity ?? 50))}
              className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
              {paying ? 'Connecting to Paystack…' : 'Pay with Paystack'}
            </button>
          </div>
        </form>
      )}

      <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Payment history</h2>
        {paymentHistory.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b text-gray-500"><th className="py-2 pr-4">Paid</th><th className="py-2 pr-4">Payment</th><th className="py-2 pr-4">Seats</th><th className="py-2 pr-4">Charged (incl. fee)</th><th className="py-2 pr-4">Access period</th><th className="py-2">Status</th></tr></thead>
              <tbody>{paymentHistory.map(payment => <tr key={payment.reference} className="border-b last:border-0">
                <td className="py-3 pr-4">{new Date(payment.paidAt || payment.dateCreated).toLocaleDateString()}</td>
                <td className="py-3 pr-4">{payment.paymentType === 'SeatUpgrade' ? 'Seat upgrade' : payment.paymentType === 'PremiumInstallment' ? 'Premium instalment' : 'Renewal'}</td>
                <td className="py-3 pr-4">{payment.paymentType === 'SeatUpgrade' ? `+${payment.studentCapacity}` : payment.paymentType === 'PremiumInstallment' ? '—' : payment.studentCapacity}</td>
                <td className="py-3 pr-4">{formatMoney(payment.amountKobo / 100)}{payment.feeAmountKobo > 0 && <small className="block text-gray-500">Includes {formatMoney(payment.feeAmountKobo / 100)} fee</small>}</td>
                <td className="py-3 pr-4">{payment.accessStartsAt && payment.accessExpiresAt ? `${new Date(payment.accessStartsAt).toLocaleDateString()} – ${new Date(payment.accessExpiresAt).toLocaleDateString()}` : '—'}</td>
                <td className="py-3"><span className={payment.status === 'Success' ? 'text-green-700' : payment.status === 'Pending' ? 'text-amber-700' : 'text-gray-500'}>{payment.status}</span>{payment.status === 'Pending' && <button type="button" onClick={() => checkPendingPayment(payment.reference)} className="ml-3 text-blue-700 hover:underline">Verify</button>}</td>
              </tr>)}</tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-sm text-gray-500">No payments yet.</p>}
      </section>
    </main>
  );
}
