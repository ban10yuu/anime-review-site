export default function AuthorBox() {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">AR</div>
        <div>
          <p className="font-bold text-lg text-white">Anime Review Lab Team</p>
          <p className="text-sm text-gray-400">Watching anime for 15+ years, reviewing since 2020</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        We watch every anime we review from start to finish. Our reviews cover story, animation quality, soundtrack, and character development with honest ratings and no sponsored content.
      </p>
    </div>
  );
}
