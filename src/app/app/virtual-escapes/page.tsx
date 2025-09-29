import { PageHeader } from "@/components/page-header";
import { EscapeViewer } from "./components/escape-viewer";

export default function VirtualEscapesPage() {
  return (
    <div>
      <PageHeader
        title="Virtual Escapes"
        description="Immerse yourself in a peaceful environment to relax and unwind."
      />
      <div className="mt-8">
        <EscapeViewer />
      </div>
    </div>
  );
}
