"use client";

import { useTodoStore } from "@/store/todo-store";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from "recharts";

export function ActivityGaugeComponent() {
    const { todos } = useTodoStore();

    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const data = [
        {
            name: "Completed",
            value: percentage,
            fill: "#8b5cf6", // Purple-500
        },
    ];

    return (
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col items-center justify-center min-h-[300px] shadow-sm">
            <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">Completion Rate</h3>
            <div className="w-full h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="100%"
                        barSize={20}
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background
                            dataKey="value"
                            cornerRadius={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--popover)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                color: 'var(--popover-foreground)'
                            }}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold text-foreground">{percentage}%</span>
                    <span className="text-xs text-muted-foreground font-medium mt-1">DONE</span>
                </div>
            </div>
            <div className="text-center mt-4 text-muted-foreground text-sm">
                <p>{completed} / {total} Tasks Completed</p>
            </div>
        </div>
    );
}
