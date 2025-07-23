import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "reesumai" },
    { name: "description", content: "check if you'll qualify" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg)] bg-cover">

    <Navbar/>
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-Powered feedback</h2>
      </div>
      </section>
      {resumes.length>0 &&(
        <div className="resumes-section">
          {resumes.map((resume)=>(
            <ResumeCard key={resumes.id} resume={resume}/>
          ))}
        </div>
      )}
  </main>
}
