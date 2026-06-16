import { EmptyState } from "./EmptyState";

export function ErrorState({ title = "Module unavailable", message }: { title?: string; message: string }) {
  return <EmptyState title={title} message={message} icon="alert" />;
}
