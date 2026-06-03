export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-5">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 sm:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
