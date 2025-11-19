import React, { useMemo } from 'react';
import { Project, ProjectStatus } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatusCategory, STATUS_CATEGORY_COLORS } from '../utils';

interface ProjectStatusChartProps {
  projects: Project[];
}

const ProjectStatusChart: React.FC<ProjectStatusChartProps> = ({ projects }) => {
  const chartData = useMemo(() => {
    const categoryCounts = projects.reduce((acc, project) => {
      const category = getStatusCategory(project.Actual_Status);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [projects]);

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No project data to display.</div>;
  }

  const colors = chartData.map(entry => STATUS_CATEGORY_COLORS[entry.name]);

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ProjectStatusChart;