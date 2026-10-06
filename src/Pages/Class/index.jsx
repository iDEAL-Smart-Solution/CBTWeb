import React, { useEffect, useState } from "react";
import ListClass from "../../Component/Class/allClassTable";
import CreateClass from "../../Component/Class/createClassForm";
import { useClass } from "../../Zustand/classSlice";
import { useNotification } from "../../Context/notificationContext";
import { Link } from "react-router-dom";
import axiosInstance from "../../Constant/axiosInstance";

export default function Class() {
    const { fetchClassList, schClass, createClass, deleteClass } = useClass();
    const { showSuccess, showError } = useNotification();
    const [name, setName] = useState('');
    const [subscriptionExpired, setSubscriptionExpired] = useState(false);
    const { loading } = schClass;

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await createClass(name);
            if (res.success) {
                setName("");
                showSuccess(res.message);
                fetchClassList();
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            let res = await deleteClass(id);
            if (res.success) {
                showSuccess(res.message);
                fetchClassList();
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClassList();
    }, [fetchClassList]);

    useEffect(() => {
        let mounted = true;
        axiosInstance.get('/api/v1/Subscription/payment-summary')
            .then(({ data }) => {
                const expiryDate = data?.expiryDate ? new Date(data.expiryDate) : null;
                const expired = data?.paymentMode !== 'Lifetime'
                    && expiryDate
                    && !Number.isNaN(expiryDate.getTime())
                    && expiryDate < new Date();
                if (mounted) setSubscriptionExpired(Boolean(expired));
            })
            .catch(() => {
                if (mounted) setSubscriptionExpired(false);
            });
        return () => { mounted = false; };
    }, []);

    const allschClass = schClass?.allschClass || [];

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                {subscriptionExpired && (
                    <div role="alert" className="mb-6 flex flex-col gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium">Your subscription has expired. Kindly navigate to the Billings section to resubscribe.</p>
                        <Link to="/payments" className="shrink-0 font-semibold underline underline-offset-2 hover:text-amber-700">
                            Go to Billings
                        </Link>
                    </div>
                )}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Classes</h1>
                <div className="space-y-8">
                    <CreateClass
                        handleSubmit={handleSubmit}
                        fieldName="name"
                        fieldvalue={name}
                        handleInputChange={handleInputChange}
                        loading={loading}
                    />
                    <ListClass classes={allschClass} loading={loading} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}
