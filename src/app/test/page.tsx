
// this page is mostly to test components and will constantly be changing

import Nav from "@/components/nav";
import DBTables from "@/components/DBTables";


const Test = () => {
    return (
        <div>
            <Nav />

            <div>
                <h1>Admin Mode</h1>
            </div>
            <DBTables isAdmin={true} />
        </div>
    );
}

export default Test;