import React, { useState } from 'react';
import { Play, Clock, CheckCircle, XCircle, Info, Users, Send } from 'lucide-react';
import useSuitMigrationStore from '../../Zustand/suitMigrationSlice';
import usePortalMigrationStore from '../../Zustand/portalMigrationSlice';

export default function MigrateStudents() {
  const [activeTab, setActiveTab] = useState('suit');

  // SUIT Migration
  const suitLoading = useSuitMigrationStore((s) => s.loading);
  const suitResult = useSuitMigrationStore((s) => s.result);
  const suitError = useSuitMigrationStore((s) => s.error);
  const migrateStudents = useSuitMigrationStore((s) => s.migrateStudents);

  // Portal Migration
  const portalLoadingStudents = usePortalMigrationStore((s) => s.loadingStudents);
  const portalLoadingStaff = usePortalMigrationStore((s) => s.loadingStaff);
  const portalResultStudents = usePortalMigrationStore((s) => s.resultStudents);
  const portalResultStaff = usePortalMigrationStore((s) => s.resultStaff);
  const portalError = usePortalMigrationStore((s) => s.error);
  const exportStudentsToPortal = usePortalMigrationStore((s) => s.exportStudentsToPortal);
  const exportStaffToPortal = usePortalMigrationStore((s) => s.exportStaffToPortal);

  // SUIT result processing
  const suitTotal = Number(suitResult?.total ?? suitResult?.Total ?? 0);
  const suitSuccessful = Number(suitResult?.successful ?? suitResult?.Successful ?? 0);
  const suitFailed = Number(suitResult?.failed ?? suitResult?.Failed ?? 0);
  const suitSuccessfulUins = Array.isArray(suitResult?.successfulUins)
    ? suitResult.successfulUins
    : Array.isArray(suitResult?.SuccessfulUins)
      ? suitResult.SuccessfulUins
      : [];
  const suitErrors = Array.isArray(suitResult?.errors)
    ? suitResult.errors
    : Array.isArray(suitResult?.Errors)
      ? suitResult.Errors
      : [];

  // Portal result processing
  const portalStudentsSent = Number(portalResultStudents?.studentsSent ?? 0);
  const portalStaffSent = Number(portalResultStaff?.staffSent ?? 0);
  const portalStudentsAcknowledged = portalResultStudents?.portalAcknowledged ?? false;
  const portalStaffAcknowledged = portalResultStaff?.portalAcknowledged ?? false;

  const handleMigrateSuit = async () => {
    await migrateStudents();
  };

  const handleExportStudentsPortal = async () => {
    await exportStudentsToPortal();
  };

  const handleExportStaffPortal = async () => {
    await exportStaffToPortal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Student & Staff Migration
          </h1>
          <p className="text-gray-600 mt-2">Migrate students and staff to SUITE or Portal systems</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('suit')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'suit'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Play size={20} />
              SUITE Migration
            </span>
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'portal'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Send size={20} />
              Portal Migration
            </span>
          </button>
        </div>

        {/* SUIT MIGRATION TAB */}
        {activeTab === 'suit' && (
          <>
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
                Execute SUITE Migration
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Click the button below to start the migration process. All students will be migrated to the SUITE system.
              </p>

              <button
                onClick={handleMigrateSuit}
                disabled={suitLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
              >
                {suitLoading ? (
                  <>
                    <Clock className="animate-spin" size={24} />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Play size={24} />
                    Migrate Students to SUITE
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {suitError && (
              <div className="rounded-lg p-4 mb-6 bg-red-50 border border-red-200 flex items-start gap-3">
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Migration Error</h3>
                  <p className="text-red-800 text-sm">
                    {typeof suitError === 'string' ? suitError : JSON.stringify(suitError)}
                  </p>
                </div>
              </div>
            )}

            {/* Migration Result */}
            {suitResult && !suitError && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  {suitFailed > 0 ? (
                    <XCircle className="text-red-600" size={24} />
                  ) : (
                    <CheckCircle className="text-green-600" size={24} />
                  )}
                  SUITE Migration Result
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm text-blue-900">Total</p>
                    <p className="text-2xl font-bold text-blue-700">{suitTotal}</p>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-sm text-green-900">Successful</p>
                    <p className="text-2xl font-bold text-green-700">{suitSuccessful}</p>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-900">Failed</p>
                    <p className="text-2xl font-bold text-red-700">{suitFailed}</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium mb-3">Successfully Migrated Student UINs</p>
                  {suitSuccessfulUins.length > 0 ? (
                    <ul className="bg-white p-4 rounded border border-green-200 max-h-96 overflow-auto space-y-2">
                      {suitSuccessfulUins.map((uin) => (
                        <li key={uin} className="text-sm text-gray-800">• {uin}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700">No successful UIN list was returned.</p>
                  )}
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium mb-3">Unsuccessful/Failed Records</p>
                  {suitErrors.length > 0 ? (
                    <ul className="bg-white p-4 rounded border border-red-200 max-h-96 overflow-auto space-y-2">
                      {suitErrors.map((item, index) => (
                        <li key={`${item}-${index}`} className="text-sm text-gray-800">• {item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700">No failed details were returned.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* PORTAL MIGRATION TAB */}
        {activeTab === 'portal' && (
          <>
            {/* Information Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex gap-3">
                <Info className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Portal Migration Instructions</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Export student records to the Portal system in bulk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Export staff records to the Portal system in bulk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Data is automatically validated and transferred to the Portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Only users that have not been previously migrated will be processed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Students Export Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-green-600" size={24} />
                Export Students to Portal
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Click the button below to export all students to the Portal system.
              </p>

              <button
                onClick={handleExportStudentsPortal}
                disabled={portalLoadingStudents}
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
              >
                {portalLoadingStudents ? (
                  <>
                    <Clock className="animate-spin" size={24} />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Export Students
                  </>
                )}
              </button>

              {portalResultStudents && !portalError && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-green-600" size={24} />
                    <h3 className="font-semibold text-green-900">Export Successful</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700">Students Sent</p>
                      <p className="text-2xl font-bold text-green-600">{portalStudentsSent}</p>
                    </div>
                    <div>
                      <p className="text-green-700">Portal Acknowledged</p>
                      <p className="text-lg font-semibold text-green-600">
                        {portalStudentsAcknowledged ? '✓ Yes' : '✗ No'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Staff Export Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-purple-600" size={24} />
                Export Staff to Portal
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Click the button below to export all staff members to the Portal system.
              </p>

              <button
                onClick={handleExportStaffPortal}
                disabled={portalLoadingStaff}
                className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
              >
                {portalLoadingStaff ? (
                  <>
                    <Clock className="animate-spin" size={24} />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Export Staff
                  </>
                )}
              </button>

              {portalResultStaff && !portalError && (
                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-purple-600" size={24} />
                    <h3 className="font-semibold text-purple-900">Export Successful</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-700">Staff Sent</p>
                      <p className="text-2xl font-bold text-purple-600">{portalStaffSent}</p>
                    </div>
                    <div>
                      <p className="text-purple-700">Portal Acknowledged</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {portalStaffAcknowledged ? '✓ Yes' : '✗ No'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {portalError && (
              <div className="rounded-lg p-4 bg-red-50 border border-red-200 flex items-start gap-3">
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Migration Error</h3>
                  <p className="text-red-800 text-sm">
                    {typeof portalError === 'string' ? portalError : JSON.stringify(portalError)}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
