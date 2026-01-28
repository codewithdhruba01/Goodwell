"use client";

import { RadarChartComponent } from "./radar-chart";
import { PieChartComponent } from "./pie-chart";
import { ActivityGaugeComponent } from "./activity-gauge";
import { BarChartComponent } from "./bar-chart";
import { LineChartComponent } from "./line-chart";

export function AnalyticsDashboard() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            <RadarChartComponent />
            <PieChartComponent />
            <ActivityGaugeComponent />
            <BarChartComponent />
            <LineChartComponent />
        </div>
    );
}
