import { Bell } from "lucide-react";

export default function Navbar({ count, onBell }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-bg/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-accent">DocKeeper</span>
        <div className="hidden md:flex gap-6 text-sm text-white/70">
          <a href="#upload">Upload</a>
          <a href="#categories">Categories</a>
          <a href="#documents">Documents</a>
          <a href="#dash">Dashboard</a>
        </div>
        <button onClick={onBell} className="relative p-2">
          <Bell size={20} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
