import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // ملف تهيئة Firebase

export default function Earn() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        await loadTasks(u.uid);
      } else {
        setUser(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // جلب المهام من مستخدمين آخرين
  async function loadTasks(userId) {
    const q = query(collection(db, "tasks"), where("ownerId", "!=", userId));
    const querySnapshot = await getDocs(q);

    const fetchedTasks = [];
    querySnapshot.forEach((doc) => {
      fetchedTasks.push({ id: doc.id, ...doc.data() });
    });

    setTasks(fetchedTasks);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* الشريط الجانبي */}
      <Sidebar />

      {/* المحتوى */}
      <div className="flex-1 flex flex-col">
        {/* الشريط العلوي */}
        <div className="flex items-center justify-between bg-white shadow p-4">
          <h1 className="text-xl font-bold">💰 ربح المال</h1>
          {user ? (
            <span className="font-semibold">👤 {user.email}</span>
          ) : (
            <span className="text-gray-500">يرجى تسجيل الدخول</span>
          )}
        </div>

        {/* قائمة المهام */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-gray-600">لا توجد مهام متاحة حاليًا.</p>
          )}
        </div>
      </div>
    </div>
  );
}
