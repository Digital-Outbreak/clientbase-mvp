import Image from "next/image";
import LandingImage from "@/../public/landing.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 h-[87vh] flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:w-1/2 lg:pr-12 flex flex-col lg:text-left text-center">
          <h1 className="text-[2.3rem] text-center lg:text-6xl font-bold capitalize my-6 lg:my-10 md:text-left">
            Manage Your <span className="text-purple-400">Agency Client</span>{" "}
            Easily
          </h1>
          <p className="text-lg text-primary-foreground/70">
            Organizing client information and managing tasks will be seamless.
            Our client portal will ensure smooth communication and effective
            management.{" "}
          </p>
          <div className="flex justify-center gap-5 lg:justify-start mt-6">
            <Button size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <Image
            src={LandingImage}
            width={1000}
            height={600}
            alt="Formula"
            className="rounded-lg shadow-lg object-cover object-center border-2 border-primary"
          />
        </div>
      </div>
    </div>
  );
}
