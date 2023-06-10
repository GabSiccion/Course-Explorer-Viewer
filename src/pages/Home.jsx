import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Nav } from "../components/Nav";

export function Home() {
  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="align-middle">Home</h1>
        </div>
      </div>

      <div className="hero-backgroundimage mb-4">
        <div className="container">
          <div className="hero-container">
            <div className="hero-image-container">
              <img
                src="../src/images/online-test.svg"
                alt="..."
                className="hero-image"
              />
            </div>
            <div>
              <h1 className="hero-title text-success">CourseExplorer</h1>
              <p className="hero-text">
                Welcome to Course Explorer, where you can explore and be
                informed about the following tracks under Information Technology
                and Computer Science; Take a quiz to determine the best course
                and track for you based on your IT/CS Knowledge.
              </p>
              <p className="hero-text">
                "The more that you read, the more things you will know. The more
                that you learn, the more places you'll go."
                <span className="quotation text-success">- Dr. Seuss</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="featured-container">
          <h1 className="text-success">Featured Courses</h1>
          <p>
            Our Track Page features cover basic introductory information about
            different tracks under Computer Studies Courses (based on current
            curriculum): Information Technology (Web Development and Networking
            Technology) Computer Science (Intelligent Systems and Game
            Development).
          </p>
          <p className="mb-4">
            Remember to try out our Quiz Feature where it offers you a suitable
            track and feature based on your knowledge
          </p>
          <div className="anchors-container">
            <a className="card-anchor btn btn-success" id="csAnchor">
              <p>Bachelor of Science in</p>
              <p>Computer Science</p>
            </a>
            <a className="card-anchor btn btn-success" id="itAnchor">
              <p>Bachelor of Science in</p>
              <p>Information Technology</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
