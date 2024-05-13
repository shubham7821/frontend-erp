import dynamic from "next/dynamic";
const NoSSRComponent = dynamic(
  () => import("@app/components/formIo/FormList"),
  {
    ssr: false,
  }
);

export default function FormBuilder() {
  return <NoSSRComponent />;
}
