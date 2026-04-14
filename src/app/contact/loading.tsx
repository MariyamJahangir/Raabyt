export default function Loading() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-3 w-40 rounded bg-white/5 mb-6" />
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-4">
            <div className="h-10 w-64 rounded bg-white/5" />
            <div className="h-4 w-80 rounded bg-white/5 mb-8" />
            <div className="h-80 rounded-xl bg-white/5" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="h-48 rounded-xl bg-white/5" />
            <div className="h-48 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
