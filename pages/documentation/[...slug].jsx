import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export default function Documentation() {
  const router = useRouter();
  const rootDoc = "livraison";
  const DocumentationLivraison = dynamic(() => import("components/base/DocumentationLivraison"), {
    ssr: false,
  });

  return (
    <>
      <DocumentationLivraison slug={router?.query?.slug?.join("/") || rootDoc} />
    </>
  );
}
