const RESUME_KEY = "resumes";

export function getResumes() {
  const data = localStorage.getItem(RESUME_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveResume(resume) {
  const resumes = getResumes();
  if (resume.id) {
    // edit existing
    const idx = resumes.findIndex(r => r.id === resume.id);
    if (idx >= 0) resumes[idx] = resume;
    else resumes.push(resume);
  } else {
    // new resume
    resume.id = Date.now();
    resumes.push(resume);
  }
  localStorage.setItem(RESUME_KEY, JSON.stringify(resumes));
}

export function getResumeById(id) {
  const resumes = getResumes();
  return resumes.find(r => r.id === Number(id));
}
