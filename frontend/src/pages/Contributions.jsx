import './Contributions.css';

function Contributions() {
  return (
    <>
      <div className="title">
        <h1>Contributions</h1>
        <hr />
      </div>
      <div className="cards">
        <div className="card">
          <div className="front">
            <h3>Competitive Coding Club</h3>
            <img src="/images/ccc.png" alt="ccc.png" draggable="false" />
          </div>
          <div className="back">
            <h3>Competitive Coding Club</h3>
            <p>
              I participated in the Competitive Coding Club at my school, which focuses on algorithms and data structures. I learned a lot about competitive programming and participated in various contests, such as USACO and NOI.
              <br /><br />
              In addition, I also learned a lot about Java, which I use frequently in contests. It for sure will help me in the future, as I plan to major in computer science.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="front">
            <h3>USACO</h3>
            <img src="/images/usaco.webp" alt="usaco.webp" draggable="false" />
          </div>
          <div className="back">
            <h3>USACO</h3>
            <p>
              I participated in the USACO (USA Computing Olympiad) twice and learned a lot about algorithms and data structures. Although I didn't do as well as I hoped, I still really enjoyed the experience and learned a lot. I plan to participate in the future and improve my skills.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="front">
            <h3>NOI</h3>
            <img src="/images/noi.jpg" alt="noi.jpg" draggable="false" />
          </div>
          <div className="back">
            <h3>NOI</h3>
            <p>
              NOI (National Olympiad in Informatics) is a prestigious computer science competition in Singapore. I participated in the NOI once and really saw the distance between me and the questions. Despite that I didn't get any type of promotion at all, I would still like to compete more. I plan to study on competitive coding more in the future.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="front">
            <h3>Game Jam 2024</h3>
            <img src="/images/game-jam.webp" alt="game-jam.webp" draggable="false" />
          </div>
          <div className="back">
            <h3>Game Jam 2024</h3>
            <p>
              My school hosts Game Jam each year, inviting every high school student to participate. I personally enrolled in the Game Jam 2024 and learned a lot about online game development. I worked with 2 of my friends and we together created a game called "Yin Yang". Although we didn't win, we believed that our game was a milstone of our collabration.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="front">
            <h3>Hackathon 2025</h3>
            <img src="/images/hackathon.webp" alt="hackathon.webp" draggable="false" />
          </div>
          <div className="back">
            <h3>Hackathon 2025</h3>
            <p>
              Hackathon is an annual event as well. Me and my team participated in the Hackathon 2025 and created a project called "LegendIBR". It is a platform that allow students to learn online, through either practice questions or toturials. Compare to the Game Jam, we definitely did better in the Hackathon in terms of both cooperation and technology. I was really proud of our work and myself.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contributions;
