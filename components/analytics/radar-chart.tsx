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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-2 rounded-lg shadow-md outline-none">
                    <p className="text-popover-foreground text-sm font-medium mb-1">{label}</p>
                    <p className="text-xs text-primary">
                        Tasks: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col items-center justify-center min-h-[300px] shadow-sm">
            <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">Project Focus</h3>
            <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#88888840" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#888888', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#888888' }} />
                        <Radar
                            name="Tasks"
                            dataKey="A"
                            stroke="#8884d8"
                            strokeWidth={3}
                            fill="#8884d8"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
