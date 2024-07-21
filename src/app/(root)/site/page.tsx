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

      <section className="py-16 ">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-purple-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Client Onboarding</h3>
              <p className="text-base text-primary-foreground/70">
                Seamlessly onboard new clients with our intuitive onboarding
                process.
              </p>
            </div>
            <div className="flex-1 bg-purple-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Task Management</h3>
              <p className="text-base text-primary-foreground/70">
                Keep track of all client tasks and deadlines with our powerful
                task management tools.
              </p>
            </div>
            <div className="flex-1 bg-purple-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Real-Time Chat</h3>
              <p className="text-base text-primary-foreground/70">
                Communicate with clients in real-time and keep all your
                conversations organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-purple-700 rounded-lg shadow-lg p-6">
              <p className="text-base text-primary-foreground/70 mb-4">
                "This platform has transformed the way we manage our clients.
                It's intuitive, powerful, and essential for our agency."
              </p>
              <p className="font-semibold">Jane Doe, CEO of Creative Agency</p>
            </div>
            <div className="flex-1 bg-purple-700 rounded-lg shadow-lg p-6">
              <p className="text-base text-primary-foreground/70 mb-4">
                "The real-time chat feature is a game-changer. Our communication
                with clients has never been smoother."
              </p>
              <p className="font-semibold">John Smith, Project Manager</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-950 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base text-primary-foreground/70 mb-8">
            Sign up now to start managing your clients more effectively and
            effortlessly.
          </p>
          <Link href="/sign-up">
            <Button size="lg">Sign Up</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
