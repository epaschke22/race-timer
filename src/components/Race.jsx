import { useState, useEffect } from "react";
import Contestant from "./Contestant.jsx";
import { contestantStyles } from "../styles";
import { contestantData } from "../assets/data";
import { useNavigate } from "react-router-dom";

function Race(props) {
  const [contestants, setContestants] = useState(contestantData);
  let navigateTo = useNavigate();

  const handleStop = () => {
    props.stopTimer();
    navigateTo("/config");
  };

  useEffect(() => {
    let newContestantPos = contestants.map((contestant) => {
      return {
        ...contestant,
        xpos: contestant.xpos + Math.floor(Math.random() * 10),
      };
    });
    setContestants(newContestantPos);
    if (props.currentTime === 0) {
      props.stopTimer();
      alert(winner().name + " is the winner!");
    }
  }, [props.currentTime]);

  function winner() {
    let winner = contestants[0];
    for (
      let i = 0;
      i <
      contestants.filter((contestant, index) => index < props.numPlayers)
        .length;
      i++
    ) {
      if (contestants[i].xpos > winner.xpos) {
        winner = contestants[i];
      }
    }
    return winner;
  }

  return (
    <div style={contestantStyles.contestantList}>
      {contestants
        .filter((contestant, index) => index < props.numPlayers)
        .map((contestant) => (
          <Contestant
            key={contestant.id}
            name={contestant.name}
            xpos={contestant.xpos}
          />
        ))}
      <button onClick={handleStop}>Stop the Timer!</button>
    </div>
  );
}
export default Race;
