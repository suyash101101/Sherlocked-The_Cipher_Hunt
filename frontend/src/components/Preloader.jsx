function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

export default Preloader;

