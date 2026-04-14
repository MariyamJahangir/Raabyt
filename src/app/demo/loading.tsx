export default function Loading() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-3 w-40 rounded bg-white/5 mb-6" />
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-10 w-64 rounded bg-white/5" />
            <div className="h-4 w-80 rounded bg-white/5" />
            <div className="mt-8 space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white/5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-32 rounded bg-white/5" />
                    <div className="h-3 w-48 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="h-[500px] rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
