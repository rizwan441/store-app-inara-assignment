export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
