import { Icon } from "@iconify/react";

type SpinnerProps = {
  open: boolean;
};

export default function Spinner({ open }: SpinnerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <Icon
        icon="glyphs:spinner-1-bold"
        className="animate-spin text-4xl [animation-duration:1.5s] text-emerald-400"
      />
    </div>
  );
}