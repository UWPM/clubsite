import Template from "@/components/template";
import Hero from "./layouts/hero";

export default function Apply() {
  return (
    <Template>
      {/* <Hero /> */}
      <div className="flex h-screen flex-col items-center justify-center space-y-1 text-pretty">
        <h1 className="-mt-16 text-4xl font-bold">Thanks for applying!</h1>
        <p className="text-muted-foreground">
          We will review your application and get back to you soon.
        </p>
      </div>
    </Template>
  );
}
