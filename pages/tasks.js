import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { onAuthStateChanged } from "firebase/auth";

export default function Tasks() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [clicks, setClicks] = useState(0);
  const [pointsPerClick, setPointsPerClick] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        loadTasks(u.uid);
      }
    });
    return () => unsub();
  }, []);

  async function loadTasks(uid) {
    const q = query(collection(db, "tasks"), where("ownerId", "==", uid));
    const snap = await getDocs(q);
    setTasks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function addTask() {
    if (!user) return;
    await addDoc(collection(db, "tasks"), {
      name: taskName,
      category,
      clicks,
      pointsPerClick,
      ownerId: user.uid,
      status: "pending",
      createdAt: new Date(),
    });
    loadTasks(user.uid);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar user={user} points={points} />

        {/* إنشاء مهمة جديدة */}
        <div className="bg-white p-4 my-4 rounded shadow">
          <h2 className="mb-2 font-bold">➕ إنشاء مهمة جديدة</h2>
          <input
            className="border p-2 mb-2 w-full"
            placeholder="اسم المهمة"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <select
            className="border p-2 mb-2 w-full"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">اختر القسم</option>
            <option value="facebook">فيسبوك</option>
            <option value="youtube">يوتيوب</option>
            <option value="linkedin">لينكدإن</option>
            <option value="instagram">إنستغرام</option>
          </select>
          <input
            className="border p-2 mb-2 w-full"
            type="number"
            placeholder="عدد النقرات"
            onChange={(e) => setClicks(e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="number"
            placeholder="النقاط لكل نقرة"
            onChange={(e) => setPointsPerClick(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={addTask}
          >
            إضافة
          </button>
        </div>

        {/* عرض المهام */}
        <h2 className="font-bold">📂 مهامي</h2>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
    }
