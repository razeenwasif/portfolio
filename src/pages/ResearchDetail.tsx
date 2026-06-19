import { Navigate, useParams } from "react-router-dom";
import { research } from "../data/site";
import { researchDetails } from "../data/details";
import { Detail } from "../components/Detail";

export function ResearchDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = research.find((r) => r.slug === slug);
  const detail = slug ? researchDetails[slug] : undefined;

  if (!item) {
    return <Navigate to="/" replace />;
  }

  return (
    <Detail
      eyebrow={`${item.index} · ${item.year} · Research · ${item.status}`}
      title={item.title}
      summary={item.summary}
      links={item.links}
      detail={detail}
      backTo="/#research"
      backLabel="Research"
      contributions={item.contribution}
      venue={item.venue}
    />
  );
}
