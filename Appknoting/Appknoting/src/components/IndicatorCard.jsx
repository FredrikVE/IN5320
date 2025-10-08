import { Card, Tag } from "@dhis2/ui";
import RatioBadge from "./RatioBadge";

export default function IndicatorCard({ title, value, target, invert = false, help }) {
  // invert=false betyr “lavere er bedre”, true betyr “høyere er bedre”
  let ok = invert ? value >= target : value <= target;
  const fmt = value != null ? Number(value).toLocaleString() : "—";

  return (
    <Card className="indicator-card">
      <div className="indicator-header">
        <h3>{title}</h3>
        <Tag positive={ok} negative={!ok}>{ok ? "OK" : "Under standard"}</Tag>
      </div>
      <div className="indicator-body">
        <div className="value">{fmt}</div>
        <RatioBadge value={value} target={target} invert={invert} />
      </div>
      {help && <div className="indicator-help">{help}</div>}
    </Card>
  );
}
