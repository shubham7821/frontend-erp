import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(
  () => import("@app/components/formIo/CreateForm"),
  {
    ssr: false,
  }
);

export default function AddEdit() {
  return <NoSSRComponent />;
}
