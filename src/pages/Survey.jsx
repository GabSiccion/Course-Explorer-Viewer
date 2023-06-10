import { Nav } from "../components/Nav";

export function Survey() {
  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="align-middle">Survey</h1>
        </div>
      </div>
      <div className="container mt-4">
        <div className="icf-container" id="icf-container">
          <p>
            Good day! We are from the 4th Year Bachelor of Science in
            Information Technology of De La Salle University - Dasmariñas
            students. As a partial fulfillment of our Capstone requirement, we
            are conducting a study entitled “Course Explorer: Web-Based Learning
            Software for Computer Studies Course Exploration at De La Salle
            University - Dasmariñas” which is an online Course Suggestion system
            that aims to inform students about subjects within the courses of
            Computer Science and Information Technology and aims to suggest a
            possible course by answering questions inside a quiz. Thie
            researcges welcomes you to take part in our study and explore our
            system; participation is entirely optional, and you may change your
            mind or withdraw at any moment.
          </p>
          <p>
            Here are the Informed Consent letter, chose the language that you
            feel the most comfortable with. Please read them before answering
            the CourseExplorer survey.
          </p>
          <a href="../assets/ICF_TAGALOG.pdf" target="blank">
            Informed Consent (Tagalog)
          </a>
          <a href="../assets/ICF_ENGLISH.pdf" target="blank">
            Informed Consent (English)
          </a>
          <button className="btn btn-success mt-4" id="icfButton">
            I have read the informed consent form and wish to participate the
            survey
          </button>
        </div>
        <div className="survey-form-container" id="survey-form-container"></div>
      </div>
    </>
  );
}
