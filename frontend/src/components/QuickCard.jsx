export default function QuickCard({ Icon, title, description, value, buttonText }) {
  return (
    <div className="card flex flex-col justify-between">
      <div className="flex items-start gap-4">
        {Icon && <Icon className="w-7 h-7 text-agri-deep" />}
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs muted">{description}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {value ? <div className="text-lg font-bold">{value}</div> : <div />}
        {buttonText && <button className="btn-primary">{buttonText}</button>}
      </div>
    </div>
  );
}
