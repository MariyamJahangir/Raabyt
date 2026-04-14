export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-purple/20 border-t-brand-purple" />
        <p className="text-sm text-muted">Loading articles...</p>
      </div>
    </div>
  );
}
