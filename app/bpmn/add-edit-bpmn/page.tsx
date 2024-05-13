import dynamic from "next/dynamic";
const NoSSRComponent = dynamic(
  () => import("@app/components/bpmn/BPMNModeler"),
  {
    ssr: false,
  }
);

export default function bpmn() {
  return <NoSSRComponent />;
}
