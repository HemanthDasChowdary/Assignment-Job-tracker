import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { Job } from "../types/job";
import { TrashIcon, LinkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

interface Props {
  refreshTrigger: boolean;
  onUpdated: () => void;
}

export default function JobList({
  refreshTrigger,
  onUpdated,
}: Readonly<Props>) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get<Job[]>("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  const deleteJob = async (id?: string) => {
    if (!id) return;
    try {
      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully!");
      onUpdated();
    } catch (error) {
      toast.error("Failed to delete job.");
      console.error("Failed to delete job:", error);
    }
  };

  const updateStatus = async (id?: string, status?: Job["status"]) => {
    if (!id || !status) return;
    try {
      await api.put(`/jobs/${id}`, { status });
      toast.success("Job status updated!");
      onUpdated();
    } catch (error) {
      toast.error("Failed to update job status.");
      console.error("Failed to update job status:", error);
    }
  };

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];
    if (statusFilter !== "All") {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }
    filtered.sort((a, b) => {
      const aDate = new Date(a.appliedDate).getTime();
      const bDate = new Date(b.appliedDate).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });
    return filtered;
  }, [jobs, statusFilter, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-all flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-2xl text-gray-800">
                {job.company} — {job.role}
              </h3>
              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>View Job</span>
                </a>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Applied on: {new Date(job.appliedDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Status:</span>
              <select
                value={job.status}
                onChange={(e) =>
                  updateStatus(job._id, e.target.value as Job["status"])
                }
                className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <button
                onClick={() => deleteJob(job._id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition"
              >
                <TrashIcon className="w-6 h-6" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No jobs found.</p>
      )}
    </div>
  );
}
