import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function MainContent() {
  return (
    <main className="p-10">
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Our Sports Venues</h1>
        <Button variant={"outline"}>
          Explore More <ChevronDown />
        </Button>
      </section>
      <section id="venues-card"></section>
    </main>
  );
}
