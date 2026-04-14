export default function Loading() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-3 w-40 rounded bg-white/5 mb-6" />
        <div className="h-10 w-96 rounded bg-white/5 mb-4" />
        <div className="h-4 w-[500px] rounded bg-white/5" />
      </div>
    </div>
  );
}
