import {
  formatDateRange,
  getEntryKind,
  getResume,
  socialUrl,
  type ResumeEntry,
} from '@/lib/resume';

const LINK_CLASS =
  'text-lg font-semibold text-[#4C7283] hover:underline break-all';

function InfoField({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  if (!value) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {href ? (
        <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className={LINK_CLASS}>
          {value}
        </a>
      ) : (
        <span className="text-lg font-semibold break-all">{value}</span>
      )}
    </div>
  );
}

function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) {
    return null;
  }
  return (
    <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function EntryView({ entry }: { entry: ResumeEntry }) {
  const kind = getEntryKind(entry);
  const date = formatDateRange(entry);

  if (kind === 'one-line') {
    return (
      <div className="flex flex-col sm:flex-row gap-1">
        <span className="text-sm font-medium text-gray-500 sm:w-56 shrink-0">
          {entry.label}
        </span>
        <span className="text-gray-700">{entry.details}</span>
      </div>
    );
  }

  if (kind === 'education') {
    return (
      <div>
        <div className="flex flex-wrap justify-between gap-1">
          <span className="text-lg font-semibold text-gray-900">
            {[entry.institution, entry.degree ? `${entry.degree} in ${entry.area ?? ''}`.trim() : entry.area]
              .filter(Boolean)
              .join(', ')}
          </span>
          {date && <span className="text-sm text-gray-500">{date}</span>}
        </div>
        {entry.location && <div className="text-sm text-gray-500">{entry.location}</div>}
        {entry.summary && <p className="mt-1 text-gray-700">{entry.summary}</p>}
        <Highlights items={entry.highlights} />
      </div>
    );
  }

  if (kind === 'experience') {
    return (
      <div>
        <div className="flex flex-wrap justify-between gap-1">
          <span className="text-lg font-semibold text-gray-900">
            {[entry.company, entry.position].filter(Boolean).join(', ')}
          </span>
          {date && <span className="text-sm text-gray-500">{date}</span>}
        </div>
        {entry.location && <div className="text-sm text-gray-500">{entry.location}</div>}
        {entry.summary && <p className="mt-1 text-gray-700">{entry.summary}</p>}
        <Highlights items={entry.highlights} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-1">
        <span className="text-lg font-semibold text-gray-900">{entry.name}</span>
        {date && <span className="text-sm text-gray-500">{date}</span>}
      </div>
      {entry.location && <div className="text-sm text-gray-500">{entry.location}</div>}
      {entry.summary && <p className="mt-1 text-gray-700">{entry.summary}</p>}
      <Highlights items={entry.highlights} />
    </div>
  );
}

export default function Page() {
  const resume = getResume();

  return (
    <main className="h-full w-full p-8 overflow-y-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{resume.name || 'Resume'}</h1>
          {resume.headline && (
            <p className="text-lg text-gray-600 mt-1">{resume.headline}</p>
          )}
        </div>
        <a
          href="/resume/Jimmy_Huang_CV.pdf"
          download
          className="inline-flex items-center rounded-lg bg-[#4C7283] px-4 py-2 font-medium text-white transition-colors hover:bg-[#3d5d6b]"
        >
          Download PDF
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base mb-10">
        <InfoField label="Location" value={resume.location} />
        <InfoField
          label="Email"
          value={resume.email}
          href={resume.email ? `mailto:${resume.email}` : undefined}
        />
        <InfoField label="Phone" value={resume.phone} />
        <InfoField
          label="Website"
          value={resume.website}
          href={resume.website || undefined}
        />
        {resume.socialNetworks.map((social) => (
          <InfoField
            key={social.network}
            label={social.network}
            value={social.username}
            href={socialUrl(social.network, social.username) ?? undefined}
          />
        ))}
      </div>

      {resume.sections.map((section) => (
        <section key={section.key} className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-4">
            {section.title}
          </h2>
          <div className="space-y-5">
            {section.entries.map((entry, index) => (
              <EntryView key={`${section.key}-${index}`} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
