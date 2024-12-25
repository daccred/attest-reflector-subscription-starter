import { Button } from '../ui/button';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick: () => void;
  description?: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  actionLabel,
  onActionClick,
  icon,
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h1 className="font-pp-supply-mono text-lg leading-[28.8px] text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>

      {actionLabel && (
        <Button
          onClick={onActionClick}
          variant="outline"
          className="gap-2 border-primary text-primary hover:text-primary/80"
        >
          {icon && <span>{icon}</span>}{' '}
          <span className="hidden sm:block">{actionLabel}</span>
        </Button>
      )}
    </div>
  );
};
