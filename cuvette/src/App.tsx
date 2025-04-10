import { useState } from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto shadow-2xl rounded-lg bg-white overflow-hidden">
        <header className="py-6 px-4 border-b border-gray-200 text-center flex flex-col items-center gap-2 bg-blue-50">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-blue-600">
              Student Job Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Effortlessly track your job applications.
          </p>
        </header>
        <main className="p-6 space-y-8">
          <JobForm onJobAdded={toggleRefresh} />
          <JobList refreshTrigger={refresh} onUpdated={toggleRefresh} />
        </main>
        <footer className="py-4 text-center border-t border-gray-200 bg-blue-50">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Student Job Tracker. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
