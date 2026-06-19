import { Navigate, useParams } from "react-router-dom";
import { projects } from "../data/site";
import { projectDetails } from "../data/details";
import { Detail } from "../components/Detail";

export function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const detail = slug ? projectDetails[slug] : undefined;

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
      detail={detail}
      backTo="/#work"
      backLabel="Selected work"
    />
  );
}
