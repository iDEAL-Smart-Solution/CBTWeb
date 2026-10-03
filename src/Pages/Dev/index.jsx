import { useCallback, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../Constant/axiosInstance';
import { BASE_URL } from '../../Constant';
import { useNotification } from '../../Context/notificationContext';

const formatNaira = value => new Intl.NumberFormat('en-NG', {
  style: 'currency', currency: 'NGN', maximumFractionDigits: 0
}).format(Number(value) || 0);

const asDateInput = value => {
  if (!value) return '';
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

export default function Dev() {
  const { showSuccess, showError } = useNotification();
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadSubscriptions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/v1/Subscription/get-subscriptions`);
      const premiumSubscriptions = (response.data || []).filter(item => item.subscriptionType === 'OneTime');
      setSubscriptions(premiumSubscriptions);
      setSelectedId(current => premiumSubscriptions.some(item => item.id === current)
        ? current : (premiumSubscriptions[0]?.id || ''));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load premium subscriptions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSubscriptions(); }, [loadSubscriptions]);

  const selectedSubscription = useMemo(
    () => subscriptions.find(item => item.id === selectedId),
    [subscriptions, selectedId]
  );

  useEffect(() => {
    if (!selectedSubscription) {
      setForm(null);
      return;
    }
    setForm({
      id: selectedSubscription.id,
      schoolName: selectedSubscription.schoolName || 'School',
      amountPaid: selectedSubscription.amountPaid ?? 0,
      targetAmount: selectedSubscription.targetAmount ?? 0,
      termPaymentPercentage: selectedSubscription.termPaymentPercentage ?? 0,
      createdAt: asDateInput(selectedSubscription.createdAt),
      allowedStudentCount: selectedSubscription.allowedStudentCount ?? 0,
      subscriptionType: 1
    });
  }, [selectedSubscription]);

  const termAmountDue = useMemo(() => {
    if (!form) return 0;
    const target = Number(form.targetAmount) || 0;
    const paid = Number(form.amountPaid) || 0;
    const pct = Number(form.termPaymentPercentage) || 0;
    return Math.min(Math.max(0, target - paid), target * pct / 100);
  }, [form]);

  const updateField = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  const save = async event => {
    event.preventDefault();
    if (!form) return;
    const paid = Number(form.amountPaid);
    const target = Number(form.targetAmount);
    const percent = Number(form.termPaymentPercentage);
    if (paid < 0 || target < 0 || percent < 0 || percent > 100 || !form.createdAt) {
      showError('Enter valid amounts, a percentage from 0 to 100, and the last payment date.');
      return;
    }
    if (paid < target && percent <= 0) {
      showError('Set a term payment percentage while there is still an amount to pay.');
      return;
    }

    setSaving(true);
    try {
      const response = await axiosInstance.put(`${BASE_URL}/api/v1/Subscription/dev-configure-subscription`, {
        id: form.id,
        allowedStudentCount: Number(form.allowedStudentCount),
        amountPaid: paid,
        targetAmount: target,
        termPaymentPercentage: percent,
        createdAt: new Date(`${form.createdAt}T00:00:00`).toISOString(),
        subscriptionType: 1
      });
      if (!response.data?.success) {
        showError(response.data?.message || 'Could not update this subscription.');
        return;
      }
      showSuccess('Premium payment settings saved.');
      await loadSubscriptions();
    } catch (requestError) {
      showError(requestError.response?.data?.message || 'Could not update this subscription.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Premium payment configuration</h1>
        <p className="mt-2 text-sm text-gray-600">Set each premium school’s amount already paid, target, four month payment percentage, and last payment date.</p>
      </div>

      {error && <div role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}
      {loading ? <p className="rounded-lg bg-white p-6 text-gray-600">Loading premium subscriptions…</p> : subscriptions.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-gray-600">No OneTime premium subscriptions were found.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <section className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="mb-3 font-semibold text-gray-900">Premium schools</h2>
            <div className="space-y-2">
              {subscriptions.map(item => (
                <button key={item.id} type="button" onClick={() => setSelectedId(item.id)}
                  className={`w-full rounded-lg border p-3 text-left ${selectedId === item.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <span className="block font-medium text-gray-900">{item.schoolName || 'School'}</span>
                  <span className="mt-1 block text-xs text-gray-600">Paid {formatNaira(item.amountPaid)} / {formatNaira(item.targetAmount)}</span>
                </button>
              ))}
            </div>
          </section>

          {form && <form onSubmit={save} className="rounded-xl border bg-white p-5 shadow-sm md:p-7">
            <h2 className="text-lg font-semibold text-gray-900">{form.schoolName}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">Amount paid to date (₦)
                <input name="amountPaid" type="number" min="0" step="0.01" value={form.amountPaid} onChange={updateField} required className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700">Total target amount (₦)
                <input name="targetAmount" type="number" min="0" step="0.01" value={form.targetAmount} onChange={updateField} required className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700">Payment percentage every four months
                <input name="termPaymentPercentage" type="number" min="0" max="100" step="0.01" value={form.termPaymentPercentage} onChange={updateField} required className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700">Last payment / cycle start date
                <input name="createdAt" type="date" value={form.createdAt} onChange={updateField} required className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
            </div>
            <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
              <p>Remaining target: <strong>{formatNaira(Math.max(0, Number(form.targetAmount) - Number(form.amountPaid)))}</strong></p>
              <p className="mt-1">Due each four month cycle: <strong>{formatNaira(termAmountDue)}</strong></p>
            </div>
            <button type="submit" disabled={saving} className="mt-5 rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save premium settings'}
            </button>
          </form>}
        </div>
      )}
    </main>
  );
}
