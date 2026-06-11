export default function AuthorBox() {
  return (
    <div className="glass-card p-6 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full sunset-gradient shadow-[0_6px_16px_-6px_rgba(224,88,143,0.6)] flex items-center justify-center text-white font-bold text-lg">AR</div>
        <div>
          <p className="font-bold text-lg text-ink">Anime Review Lab Team</p>
          <p className="text-sm text-ink-muted">Watching anime for 15+ years, reviewing since 2020</p>
        </div>
      </div>
      <p className="text-sm text-ink-soft leading-relaxed">
        We watch every anime we review from start to finish. Our reviews cover story, animation quality, soundtrack, and character development with honest ratings and no sponsored content.
      </p>
    </div>
  );
}
