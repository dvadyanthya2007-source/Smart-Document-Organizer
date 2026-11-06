import EyeTracker from "./EyeTracker";
import CardSwap from "./CardSwap";
import Reveal from "./Reveal";

const cards = [
  { icon: "⬆️", title: "Upload", text: "Drop in any document with its expiry date." },
  { icon: "🗂️", title: "Organise", text: "Categories, search and filters keep files findable." },
  { icon: "⏰", title: "Never miss a date", text: "Reminders on the due day and days before." },
];

export default function Hero() {
  return (
    <section className="min-h-screen pt-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      <div>
        <EyeTracker />
        <h1 className="text-5xl md:text-6xl font-bold mt-8 leading-tight">
          Every document, <span className="text-accent">always on time.</span>
        </h1>
        <p className="text-white/60 mt-4 max-w-md">
          Upload, categorise, search and manage your important documents, with smart reminders before anything expires.
        </p>
        <a href="#upload" className="inline-block mt-6 bg-accent text-black font-semibold px-6 py-3 rounded-full">Upload a document</a>
      </div>
      <Reveal><CardSwap cards={cards} /></Reveal>
    </section>
  );
}
