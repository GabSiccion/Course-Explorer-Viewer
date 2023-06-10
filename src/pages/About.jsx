import { Nav } from "../components/Nav";

export function About() {
  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="align-middle">About</h1>
        </div>
      </div>
      <div className="container pt-4 pb-4">
        <div className="text-left mb-4">
          <h2>Why Course Explorer is made?</h2>
          <p>
            Course Program Exploration is one of the important things in career
            planning. It improves students' knowledge. It gives an opportunity
            to experience a course. Most of the time, students have an idea or a
            list of what careers are suitable for them to choose. But
            unfortunately, most of the students do not possess the information
            or any idea about their target career and base their idea of it on
            subjects that they learn in school (Nyamwange, 2016). According to
            Yusran et al. (2021), knowing your skills, abilities, and talents,
            are central elements to the earliest career development fields.
          </p>
          <p>
            To address this lack of course exploration problem, the researchers
            proposed this study to create and develop CourseExplorer. A
            web-based software for Information Technology and Computer Science
            Course Program Exploration.
          </p>
          <a
            className="btn btn-success"
            href="https://tinyurl.com/Course-Explorer-Manuscript"
          >
            Link to Chapter I-III Manuscript
          </a>
        </div>
        <h2>The Researchers</h2>
        <div className="person-card-container">
          <div className="person-card">
            <div className="person-body">
              <p className="person-name">Riz Angel Veran</p>
              <ul>
                <li>Born in: Silang, Cavite</li>
                <li>Lives in: Dasmarinas, Cavite</li>
                <li>
                  Hobbies: reading, watching documentaries, listenting to KPOP
                </li>
                <li>Dream: Reading</li>
              </ul>
              <div>
                Contacts
                <ul>
                  <li>vrf0360@dlsud.edu.ph</li>
                  <li>+63 09167790308</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="person-card">
            <div className="person-card-body">
              <p className="person-name">Gabriel Noel V. Siccion</p>
              <p>
                Creating CourseExplorer was a great challenge, and the hardest
                part of them all was figuring out how to make it in the first
                place and with what programming language. Web Development has
                too many tools, and I'm still confused about which to use.
              </p>
              <div>
                Contacts
                <ul>
                  <li>sgv133@dlsud.edu.ph</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
