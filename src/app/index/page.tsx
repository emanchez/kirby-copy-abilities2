import Nav from "@/components/nav"
import AbilityMngmt from "@/components/AbilityMngmt";
import GameMngmt from "@/components/GameMngmt";

const Index = () => {
    return (
        <div>
            <Nav />
            <div id="sub-nav">
                <h2>goto:</h2> 
                <ul>
                    <li><a href="#abilities">abilities</a></li>
                    <li><a href="#games">games</a></li>
                </ul>
            </div>
            <div id="abilities">
                <h1>ABILITIES</h1>
            </div>
            <AbilityMngmt isAdmin={false} />
            <div id="games">
                <h1>GAMES</h1>
            </div>
            <GameMngmt isAdmin={false}/>
        </div>
    );
}

export default Index;