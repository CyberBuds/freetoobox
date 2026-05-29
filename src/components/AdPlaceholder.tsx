import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  className?: string;
  label?: string;
}

export default function AdPlaceholder({ className, label = "Advertisement" }: AdPlaceholderProps) {
  return (
    <div className={cn(
      "w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center min-h-[100px] overflow-hidden relative",
      className
    )}>
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold absolute top-2 left-1/2 -translate-x-1/2">
          {label}
        </span>
        <div className="text-gray-300 font-mono text-sm">
          AdSense Unit Placeholder
        </div>
      </div>
    </div>
  );
}
