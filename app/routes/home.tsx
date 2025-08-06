import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "reesumai" },
    { name: "description", content: "check if you'll qualify" },
  ];
}

export default function Home() {

  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState(false)


  useEffect(()=>{
    if(!auth.isAuthenticated) navigate("/");
  },[auth.isAuthenticated])
  useEffect(() => {
    const loadResumes = async()=>{
      setLoadingResume(true);

      const resumes = (await kv.list('resumes:*', true)) as KVItem[];

      const parsedResume = resume?.map((resume)=>(
          JSON.parse(resume.value) as Resume
      ))
      setResume(parsedResume || []);
      setLoadingResume(false);
    }
    loadResumes()
  }, []);

  return <main className="bg-[url('/images/bg-main.svg)] bg-cover">

    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-15">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-Powered feedback</h2>
      </div>
      {!loadingResume && resume.length > 0 &&(
          <div className="resumes-section">
            {resume.map((resume)=>(
                <ResumeCard key={resume.id} resume={resume}/>
            ))}
          </div>
      )}
      {!loadingResume && resume?.length === 0 &&(
          <div className='flex flex-col items-center justify-center mt-10 gap-4'>
            <Link to='/upload' className='primary-button w-fit text-xl font-semibold'>
              Upload Resume
            </Link>
          </div>
      )}
      </section>

  </main>
}
