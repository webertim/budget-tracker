import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { memo, useEffect } from 'react';

const chartConfig = {
  desktop: {
    label: 'Ausgegeben',
    color: 'hsl(var(--background))',
  },
  mobile: {
    label: 'Rest',
    color: '#FFAE7B',
  },
} satisfies ChartConfig;

type Props = {
  budget: number;
  spent: number;
  month: Date;
};

const BudgetChart = ({ budget, spent, month }: Props) => {
  const chartData = [{ month: month, desktop: budget - spent, mobile: spent }];

  useEffect(() => {
    console.log('mount');
  }, []);

  console.log('rerender');

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-white text-2xl font-bold"
                    >
                      <tspan className="text-sm">€</tspan>
                      {(budget - spent).toFixed(2)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-popover"
                    >
                      Rest
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
};

export default memo(BudgetChart);
