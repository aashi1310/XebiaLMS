/**
 * CertificateCard.jsx
 * Displays a certificate with credential ID, issued date, and download action.
 */

import React from 'react';
import { RiAwardLine, RiDownloadLine } from 'react-icons/ri';
import Badge from '../common/Badge';

const CertificateCard = ({ certificate }) => {
  const { title, category, issuedDateLabel, credentialId, instructor } = certificate;

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Icon + badge */}
      <div className="flex items-start justify-between">
        <span className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-lg">
          <RiAwardLine />
        </span>
        <Badge label={category} />
      </div>

      {/* Course name */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{instructor}</p>
      </div>

      {/* Credential ID + date */}
      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
        <p>Credential ID: <span className="font-mono font-medium">{credentialId}</span></p>
        <p>Issued: {issuedDateLabel}</p>
      </div>

      {/* Download button */}
      <button
        className="flex items-center gap-1.5 text-xs font-medium text-[#6C1D5F] hover:text-[#4A1E47] transition-colors self-start"
        aria-label={`Download certificate for ${title}`}
      >
        <RiDownloadLine className="text-sm" />
        Download Certificate
      </button>
    </article>
  );
};

export default React.memo(CertificateCard);
