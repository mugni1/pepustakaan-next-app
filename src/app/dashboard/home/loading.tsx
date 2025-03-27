export default function Loading() {
  return (
    <section className="w-full grid grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-full h-32 bg-slate-400 animate-pulse rounded-xl"
        ></div>
      ))}
    </section>
  );
}
