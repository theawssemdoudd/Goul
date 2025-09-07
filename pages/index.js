import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [user, setUser] = useState(null); // مؤقت لعرض حالة تسجيل الدخول

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* الشريط الجانبي */}
      <Sidebar />

      {/* المحتوى */}
      <div className="flex-1 flex flex-col">
        {/* الشريط العلوي */}
        <div className="flex items-center justify-between bg-white shadow p-4">
          <h1 className="text-xl font-bold">🚀 منصّة المهام</h1>

          <div className="flex gap-2">
            {!user ? (
              <>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  تسجيل
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  تسجيل الدخول
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-semibold">{user.email}</span>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>

        {/* المحتوى الأساسي */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">👋 مرحبًا بك</h2>
          <p className="text-gray-600">
            هذه الصفحة الرئيسية. يمكنك استخدام الشريط الجانبي للتنقل بين الصفحات.
          </p>
        </div>
      </div>
    </div>
  );
}
