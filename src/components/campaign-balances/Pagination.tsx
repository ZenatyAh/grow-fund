export function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button className="w-8 h-8 rounded-full border text-gray-500">‹</button>

      {[5, 4, 3, 2, 1].map((n) => (
        <button
          key={n}
          className={`w-8 h-8 rounded-full text-sm ${
            n === 1 ? 'bg-blue-600 text-white' : 'border text-gray-600'
          }`}
        >
          {n}
        </button>
      ))}

      <button className="w-8 h-8 rounded-full border text-gray-500">›</button>
    </div>
  );
}
