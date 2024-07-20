import Image from "next/image";
import LandingImage from "@/../public/landing.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OwnerHeader from "@/components/owners/OwnerHeader";

export default function Home() {
  return (
    <div>
      <OwnerHeader />
      <div className="container mx-auto px-4 lg:px-8 py-12 h-[87vh] flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 lg:pr-12 flex flex-col text-center lg:text-left">
            <h1 className="text-3xl lg:text-6xl font-bold capitalize my-6 lg:my-10">
              Manage Your <span className="text-purple-400">Agency Client</span>{" "}
              Easily
            </h1>
            <p className="text-base lg:text-lg text-primary-foreground/70">
              Organizing client information and managing tasks will be seamless.
              Our client portal will ensure smooth communication and effective
              management.
            </p>
            <div className="flex justify-center lg:justify-start gap-5 mt-6">
              <Link href="/sign-up">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <Image
              src={LandingImage}
              width={1000}
              height={600}
              alt="Formula"
              className="rounded-lg shadow-lg object-cover border-2 border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
