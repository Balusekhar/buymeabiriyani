import Image from "next/image";
import biriyani from "../assets/biriyani.png";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { auth } from "../auth";
import { redirect } from "next/navigation";

async function Hero() {
  
  const handleSignIn = async () => {
    "use server";
    const session = await auth();
    if (session && session.user) {
      redirect(`${session.user.username}/dashboard`);
    } else {
      await signIn("google", { redirectTo: "/welcome" });
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center container mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
      <div className=" ">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="">
            {/* Separate the heading into two parts for better alignment */}
            <h1 className="text-3xl font-bold p-2 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Spice Up Your Support with
            </h1>
                
            {/* Flex container to align text and image */}
            <div className="flex justify-center items-center">
              <span className="text-3xl font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 sm:text-4xl md:text-5xl lg:text-6xl">
                BuyMeABiriyani
              </span>
              <Image
                className="w-12 md:w-20 lg:w-[5rem] ml-2"
                src={biriyani}
                alt="Biriyani logo"
              />
            </div>

            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Show your appreciation for content creators by treating them to a
              virtual plate of biriyani. It's like buying them a coffee, but
              with more flavor!
            </p>
          </div>
          <div className="space-x-4">
            <form action={handleSignIn}>
              <Button className="bg-gradient-to-r px-10 py-6 from-orange-500 to-red-600 text-white hover:opacity-90 transition-opacity">
                Start my page
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
