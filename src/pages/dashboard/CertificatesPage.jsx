/**
 * CertificatesPage.jsx
 * Displays all earned certificates in a grid.
 */

import React, { useEffect, useState } from 'react';
import { getCertificates } from '../../services/mockApi';
import CertificateCard from '../../components/cards/CertificateCard';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { RiAwardLine } from 'react-icons/ri';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertificates().then(({ data }) => {
      setCertificates(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader message="Loading certificates..." />;

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Certificates</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Your earned credentials and achievements.
        </p>
      </div>

      {certificates.length === 0 ? (
        <EmptyState
          icon={RiAwardLine}
          title="No certificates yet"
          description="Complete a course to earn your first certificate."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map(cert => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
