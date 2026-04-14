export default function Loading() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-3 w-40 rounded bg-white/5 mb-6" />
        <div className="h-10 w-80 rounded bg-white/5 mb-4" />
        <div className="h-4 w-[460px] rounded bg-white/5 mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
