export default function page() {
  return (
    <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white p-8">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start mb-4">
          {" "}
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold ml-2 mb-4">التفاصيل :</span>
            <span className="text-base text-gray-700 mb-4">
              تكتب هنا تفاصيل التذكرة
            </span>{" "}
          </div>
          <div className="flex items-center mb-2">
            <span className="ml-2 text-gray-500">تاريخ الإضافة :</span>
            <span className="text-gray-700">2024/10/07 23:18</span>
          </div>
          <span className="text-gray-500 mb-2">صور السيارة</span>
          <div className="flex gap-2">
            <img
              src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=facearea&w=100&h=100"
              alt="car1"
              className="w-16 h-16 rounded object-cover border"
            />
            <img
              src="https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=100&h=100"
              alt="car2"
              className="w-16 h-16 rounded object-cover border"
            />
            <img
              src="https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=facearea&w=100&h=100"
              alt="car3"
              className="w-16 h-16 rounded object-cover border"
            />
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=100&h=100"
              alt="car4"
              className="w-16 h-16 rounded object-cover border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
