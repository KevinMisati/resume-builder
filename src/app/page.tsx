import Head from "next/head";
import Link from "next/link";
import sample1 from "@/assets/Jhon Doe.jpg";
import sample2 from "@/assets/mary.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-200">
      <Head>
        <title>Resume Builder | Build Your Professional Resume</title>
        <meta
          name="description"
          content="Create stunning resumes effortlessly with our powerful builder."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-700 px-8 py-16 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Build Your Professional Resume in Minutes
          </h1>
          <p className="mb-6 text-lg">
            Our powerful builder makes creating a stunning resume effortless.
          </p>
          <Link href="/resumes">
            <button className="rounded bg-white px-6 py-3 font-semibold text-blue-700 shadow hover:bg-gray-100">
              Get Started for Free
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Why Choose Our Builder?</h2>
          <div className="flex items-center justify-center">
            <div className="m-2 max-w-[450px] rounded bg-gray-800 p-6 shadow">
              <h3 className="mb-2 text-xl font-semibold text-white">
                Easy to Use
              </h3>
              <p>
                Our intuitive interface makes it simple to create resumes
                without any hassle.
              </p>
            </div>

            <div className="m-2 max-w-[450px] rounded bg-gray-800 p-6 shadow">
              <h3 className="mb-2 text-xl font-semibold text-white">
                Download in One Click
              </h3>
              <p>
                Export your resume in PDF format instantly and share it
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="bg-gray-800 px-8 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">See What You Can Create</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Image
              src={sample1}
              alt="Resume Sample 1"
              className="rounded shadow"
            />
            <Image
              src={sample2}
              alt="Resume Sample 2"
              className="rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="px-8 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded bg-gray-800 p-6 shadow">
              <p className="italic">
                "This builder saved me so much time. My resume looks amazing!"
              </p>
              <p className="mt-4 font-semibold">- Jane Doe</p>
            </div>
            <div className="rounded bg-gray-800 p-6 shadow">
              <p className="italic">
                "I landed my dream job thanks to this tool. Highly recommend!"
              </p>
              <p className="mt-4 font-semibold">- John Smith</p>
            </div>
          </div>
        </div>
      </section>
 */}
      {/* Footer */}
      <footer className="bg-blue-700 py-8 text-center text-white">
        <p>
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
