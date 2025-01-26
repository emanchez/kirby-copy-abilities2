import Nav from "@/components/nav"
import AbilityMngmt from "@/components/AbilityMngmt"

const Index = () => {
    return (
        <div>
            <Nav />
            <div>
                <h1>Admin Mode</h1>
            </div>
            <AbilityMngmt isAdmin={true} />
        </div>
    );
}

export default Index;