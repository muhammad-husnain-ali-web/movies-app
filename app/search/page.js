import { Suspense } from "react";
import Search from "./Search";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <Search />
    </Suspense>
  )
}
