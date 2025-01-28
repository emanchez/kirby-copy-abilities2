import Nav from "@/components/nav"
import DBTables from "@/components/DBTables";

const Index = () => {
    return (
        <div>
            <Nav />
            <div>
                <h1>Main Page</h1>
            </div>
            <DBTables isAdmin={false} />
        </div>
    );
}

export default Index;