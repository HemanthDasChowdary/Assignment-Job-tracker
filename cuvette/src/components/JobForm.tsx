import { useState } from "react";
import api from "../services/api";
import { Job } from "../types/job";
import { toast } from "react-toastify";
import {
  LinkIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

interface Props {
  onJobAdded: () => void;
}

const defaultForm: Job = {
  company: "",
  role: "",
  status: "Applied",
  appliedDate: "",
  link: "",
};

export default function JobForm({ onJobAdded }: Readonly<Props>) {
  const [form, setForm] = useState<Job>(defaultForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.link && form.link.trim() !== "") {
        new URL(form.link);
      }
    } catch {
      toast.error("Invalid URL format for job link.");
      return;
    }

    const res = await api.get<Job[]>("/jobs");
    const hasDuplicate = res.data.some(
      (job) =>
        job.company.toLowerCase() === form.company.toLowerCase() &&
        job.role.toLowerCase() === form.role.toLowerCase()
    );

    if (hasDuplicate) {
      toast.error("Duplicate job application found (same company + role).");
      return;
    }

    await api.post("/jobs", form);
    toast.success("Job added successfully!");
    onJobAdded();
    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 mb-6 bg-white rounded-lg shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <BriefcaseIcon className="w-6 h-6 text-blue-500" />
        Add New Job
      </h2>
      <div className="space-y-4">
        <div className="relative">
          <BuildingOfficeIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <BriefcaseIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <LinkIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
          <input
            name="link"
            placeholder="Job Link"
            value={form.link}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Add Job
      </button>
    </form>
  );
}
