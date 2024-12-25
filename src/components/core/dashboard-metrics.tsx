import React from 'react';

interface Stat {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface DashboardMetricsProps {
  stats: {
    attestations: Stat;
    schemas: Stat;
    wallets: Stat;
    uniqueAttestors: Stat;
    uniqueCreators: Stat;
  };
}

const DEFAULT_ICON_COLOR = '#ccc';

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ stats }) => {
  const formatValue = (value: number | string) => {
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', { useGrouping: true });
    }
    return value;
  };

  return (
    <div className="flex items-center justify-between gap-10 overflow-scroll [&::-webkit-scrollbar]:hidden">
      {Object.entries(stats).map(
        ([key, stat]): React.ReactNode => (
          <div
            key={key}
            className="flex w-fit flex-shrink-0 flex-col items-start"
          >
            <div className="flex items-center gap-2">
              {stat.icon ? (
                <div>{stat.icon}</div>
              ) : (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: stat.color ?? DEFAULT_ICON_COLOR,
                  }}
                />
              )}
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <span className="font-pp-supply-mono text-[32px] leading-[38.4px] text-foreground">
              {formatValue(stat.value)}
            </span>
          </div>
        ),
      )}
    </div>
  );
};

export default DashboardMetrics;
