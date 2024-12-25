'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  type NameType,
  type ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const timeRanges = ['1H', '24H', '1W', '1M', '6M', 'All'];

interface ChartData {
  day: string;
  Attestations: number;
  Schemas: number;
  Wallets: number;
}

interface OverviewChartProps {
  data: ChartData[];
}

export default function OverviewChart({ data }: OverviewChartProps) {
  const [selectedRange, setSelectedRange] = useState<string>('1W');

  const formatYAxis = (value: string) => {
    const numValue = parseFloat(value);
    if (numValue >= 1e6) return `${(numValue / 1e6).toFixed(1)}m`;
    if (numValue >= 1e3) return `${(numValue / 1e3).toFixed(1)}k`;
    return value;
  };

  return (
    <Card className="flex w-full flex-col gap-6 rounded-none border-[0.5px] bg-transparent py-4">
      <CardHeader className="flex flex-col items-start justify-between gap-3 space-y-0 sm:flex-row sm:items-center sm:gap-6">
        <CardTitle className="text-xl font-normal text-foreground">
          OVERVIEW
        </CardTitle>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? 'secondary' : 'outline'}
              className="h-[29px] w-12 rounded-md border-[0.5px] text-xs"
              font="sans"
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            Attestations: {
              label: 'Attestations',
              color: 'hsl(var(--chart-1))',
            },
            Schemas: {
              label: 'Schemas',
              color: 'hsl(var(--chart-3))',
            },
            Wallets: {
              label: 'Wallets',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="z-20 h-auto w-full md:h-[276px]"
        >
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="day"
              stroke="#888888"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              strokeDasharray="3 3"
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              stroke="#888888"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
              tickFormatter={formatYAxis}
            />
            <ChartTooltip
              cursor={{
                stroke: '#8884d8',
                strokeDasharray: '3 3',
              }}
              content={
                <CustomTooltip
                  colors={{
                    Attestations: 'hsl(var(--chart-1))',
                    Schemas: 'hsl(var(--chart-3))',
                    Wallets: 'hsl(var(--chart-2))',
                  }}
                />
              }
            />
            <Line
              type="linear"
              dataKey="Attestations"
              stroke="var(--color-Attestations)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="linear"
              dataKey="Schemas"
              stroke="var(--color-Schemas)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="linear"
              dataKey="Wallets"
              stroke="var(--color-Wallets)"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  colors: Record<string, string>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  colors,
}) => {
  if (!active || !payload) return null;

  return (
    <div className="w-[206px] rounded-lg border-[.5px] border-stroke bg-white/30 p-3 shadow-lg backdrop-blur-md dark:bg-[#1E1E1E4D]/30">
      <p className="mb-2 hidden text-muted-foreground">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="mb-1 flex items-center justify-between">
          <span className="flex items-center">
            <div
              className="mr-2 h-[10px] w-[10px] rounded-full"
              style={{
                backgroundColor:
                  colors[entry.name as keyof typeof colors] || entry.color,
              }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
          </span>
          <span className="font-medium text-black dark:text-white">
            {typeof entry.value === 'number'
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
