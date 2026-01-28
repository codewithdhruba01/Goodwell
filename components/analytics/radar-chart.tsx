"use client";

import { useTodoStore } from "@/store/todo-store";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

export function RadarChartComponent() {
    const { todos } = useTodoStore();

    // Prepare data: Count todos per project
    const projectCounts: Record<string, number> = {};
    todos.forEach(todo => {
        const project = todo.project || "Uncategorized";
        projectCounts[project] = (projectCounts[project] || 0) + 1;
    });

    const data = Object.keys(projectCounts).map(project => ({
        subject: project,
        A: projectCounts[project],
        fullMark: Math.max(...Object.values(projectCounts)) + 2, // Scale cap
    }));

    // If no data, show empty state or basic placeholders
    if (data.length < 3) {
        // Add dummy axes to make the chart look like a radar even with low data
        if (!data.find(d => d.subject === "Work")) data.push({ subject: "Work", A: 0, fullMark: 10 });
        if (!data.find(d => d.subject === "Personal")) data.push({ subject: "Personal", A: 0, fullMark: 10 });
        if (!data.find(d => d.subject === "Health")) data.push({ subject: "Health", A: 0, fullMark: 10 });
    }

    return (
        <div className="bg-[#1E1E1E] p-6 rounded-3xl flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider">Project Focus</h3>
            <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#27272a', borderRadius: '8px', border: 'none', color: '#f4f4f5' }}
                            itemStyle={{ color: '#8884d8' }}
                        />
                        <Radar
                            name="Tasks"
                            dataKey="A"
                            stroke="#8884d8"
                            strokeWidth={3}
                            fill="#8884d8"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
