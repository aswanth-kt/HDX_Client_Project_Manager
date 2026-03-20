import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

const ProjectChart = ({ data }) => {

  return (
    <div className="bg-white p-6 rounded shadow h-80">

      <h2 className='text-lg font-semnibold'>
        Project Status
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}

          </Pie>

          <Tooltip />
          <Legend/>

        </PieChart>

      </ResponsiveContainer>

    </div>
  )
};

export default ProjectChart;