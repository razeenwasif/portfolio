import { Navigate, useParams } from "react-router-dom";
import { projects } from "../data/site";
import { Detail } from "../components/Detail";

export function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <Detail
      eyebrow={`${project.index} · ${project.year} · Work`}
      title={project.title}
      summary={project.summary}
      stack={project.stack}
      links={project.links}
      detail={project.detail}
      backTo="/#work"
      backLabel="Selected work"
    />
  );
}
