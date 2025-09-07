
function AboutContent() {
    console.log("AboutContent rendered");
    return (
        <article className="flex flex-col text-justify p-3 gap-y-2 max-w-6xl font-bold relative z-10 text-ptlbrown-100 mx-auto">
            <h1 className="text-3xl self-center">ABOUT ME</h1>
            <p className="indent-7">
                I’m <span className="font-bold">CodeVANIE</span> — a 24-year-old developer who thrives on solving complex challenges and building efficient, user-focused solutions. For the past two years, I’ve worked at Oracle NetSuite, starting in General Operations where I handled 4–6 SuiteCloud-related cases daily, mentored new hires, and earned recognition as Top Employee of the Month. I later joined the SWAT Enterprise team, working with the top 200 enterprise clients to tackle high-impact cases under pressure, combining deep technical troubleshooting with clear communication and collaboration.
            </p>
            <p className="indent-7">
                Before my professional career, I completed a Bachelor’s degree in Computer Science at the Technological Institute of the Philippines, where I led multiple academic projects — from building an Automated Teller Machine system in Java to developing a scholarship retention prediction portal using Support Vector Machine. I also completed a web development internship at DevOps Technologies, where I worked on a Point of Sales system and a booking website, gaining valuable experience in .NET, C#, and full-stack development.
            </p>
            <p className="indent-7">
                Beyond my core expertise in backend development with SuiteScript, SQL, and APIs, I have strong skills in JavaScript, ReactJS, HTML, CSS, and Tailwind CSS. I’m passionate about problem-solving, continuous learning, and delivering meaningful results through technology. This portfolio is a reflection of my journey, combining my technical skills, hands-on experience, and creative drive to grow as a developer and contribute to impactful projects.
            </p>
        </article>
    )
}

export default AboutContent