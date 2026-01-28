import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type JobCategory = "Engineering" | "Design" | "Marketing" | "Sales" | "Data" | "Other";

export interface Job {
    id: string;
    title: string;
    category: JobCategory;
}

interface JobState {
    jobs: Job[];
    addJob: (title: string, category: JobCategory) => void;
    removeJob: (id: string) => void;
}

const DEFAULT_JOBS: Job[] = [
    { id: "1", title: "Senior Product Design", category: "Design" },
    { id: "2", title: "Software Engineer", category: "Engineering" },
    { id: "3", title: "Account Executive", category: "Sales" },
    { id: "4", title: "Marketing Manager", category: "Marketing" },
    { id: "5", title: "Data Analyst", category: "Data" },
];

export const useJobStore = create<JobState>()(
    persist(
        (set) => ({
            jobs: DEFAULT_JOBS,
            addJob: (title, category) =>
                set((state) => ({
                    jobs: [
                        ...state.jobs,
                        { id: uuidv4(), title, category },
                    ],
                })),
            removeJob: (id) =>
                set((state) => ({
                    jobs: state.jobs.filter((job) => job.id !== id),
                })),
        }),
        {
            name: "job-storage",
        }
    )
);
