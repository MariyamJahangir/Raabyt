import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/raabyt-icon.png"
          alt="Raabyt"
          width={56}
          height={56}
          className="h-14 w-14 animate-pulse"
          priority
        />
        <div className="h-1 w-16 rounded-full overflow-hidden bg-white/5">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-brand-purple to-brand-magenta animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
