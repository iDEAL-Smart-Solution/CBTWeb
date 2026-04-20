import React from 'react';
import { Play, Clock, CheckCircle, XCircle, Info, Users } from 'lucide-react';
import useSuitMigrationStore from '../../Zustand/suitMigrationSlice';

export default function MigrateStudents() {
  const loading = useSuitMigrationStore((s) => s.loading);
  const result = useSuitMigrationStore((s) => s.result);
  const error = useSuitMigrationStore((s) => s.error);
  const migrateStudents = useSuitMigrationStore((s) => s.migrateStudents);
  const total = Number(result?.total ?? result?.Total ?? 0);
  const successful = Number(result?.successful ?? result?.Successful ?? 0);
  const failed = Number(result?.failed ?? result?.Failed ?? 0);
  const successfulUins = Array.isArray(result?.successfulUins)
    ? result.successfulUins
    : Array.isArray(result?.SuccessfulUins)
      ? result.SuccessfulUins
      : [];
  const errors = Array.isArray(result?.errors)
    ? result.errors
    : Array.isArray(result?.Errors)
      ? result.Errors
      : [];

  const handleMigrate = async () => {
    await migrateStudents();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Migrate Students
          </h1>
          <p className="text-gray-600 mt-2">Migrate students to SUIT system from your current school database</p>
        </div>

        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <Info className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>This tool migrates all student records from your current database to the SUIT system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Student data is automatically mapped and transferred in bulk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>The School ID is obtained from your session; ensure you are logged in as a Superadmin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>The migration process may take some time depending on the number of students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Caution:</strong> Ensure your database is backed up before running migrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Migrate Button Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-gray-600" size={24} />
            Execute Migration
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Click the button below to start the migration process. All students will be migrated to the SUIT system.
          </p>

          <button
            onClick={handleMigrate}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Clock className="animate-spin" size={24} />
                Migrating...
              </>
            ) : (
              <>
                <Play size={24} />
                Migrate Students
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg p-4 mb-6 bg-red-50 border border-red-200 flex items-start gap-3">
            <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Migration Error</h3>
              <p className="text-red-800 text-sm">
                {typeof error === 'string' ? error : JSON.stringify(error)}
              </p>
            </div>
          </div>
        )}

        {/* Migration Result */}
        {result && !error && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              {failed > 0 ? (
                <XCircle className="text-red-600" size={24} />
              ) : (
                <CheckCircle className="text-green-600" size={24} />
              )}
              Migration Result
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">Total</p>
                <p className="text-2xl font-bold text-blue-700">{total}</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-900">Successful</p>
                <p className="text-2xl font-bold text-green-700">{successful}</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-900">Failed</p>
                <p className="text-2xl font-bold text-red-700">{failed}</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium mb-3">Successfully Migrated Student UINs</p>
              {successfulUins.length > 0 ? (
                <ul className="bg-white p-4 rounded border border-green-200 max-h-96 overflow-auto space-y-2">
                  {successfulUins.map((uin) => (
                    <li key={uin} className="text-sm text-gray-800">• {uin}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">No successful UIN list was returned.</p>
              )}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium mb-3">Unsuccessful/Failed Records</p>
              {errors.length > 0 ? (
                <ul className="bg-white p-4 rounded border border-red-200 max-h-96 overflow-auto space-y-2">
                  {errors.map((item, index) => (
                    <li key={`${item}-${index}`} className="text-sm text-gray-800">• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">No failed details were returned.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
