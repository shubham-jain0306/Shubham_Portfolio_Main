const SectionLabel = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-muted-foreground text-xs font-mono">.{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};

export default SectionLabel;
