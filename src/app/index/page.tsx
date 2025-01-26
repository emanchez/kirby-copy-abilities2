import Nav from "@/components/nav"
import AbilityMngmt from "@/components/AbilityMngmt";

const Index = () => {
    return (
        <div>
            <Nav />
            <div>
                <h1>Home page</h1>
            </div>
            <AbilityMngmt isAdmin={false} />
        </div>
    );
}

export default Index;