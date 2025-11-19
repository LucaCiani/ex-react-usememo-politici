import { useEffect, useState, useMemo, memo } from "react";

const Card = memo(function Card({ politician }) {
    console.log("Render Card:", politician.name);
    return (
        <div className="card h-100">
            <img src={politician.image} className="card-img-top" alt="" />
            <div className="card-body">
                <h3 className="card-title">{politician.name}</h3>
                <p className="card-text">{politician.position}</p>
                <p className="card-text">{politician.biography}</p>
            </div>
        </div>
    );
});

function App() {
    const [politicians, setPoliticians] = useState([]);
    const [search, setSearch] = useState("");

    const loadPoliticians = async () => {
        const res = await fetch("http://localhost:3333/politicians");
        const data = await res.json();
        setPoliticians(data);
    };

    useEffect(() => {
        loadPoliticians();
    }, []);

    const filteredPoliticians = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return politicians;
        return politicians.filter((p) => {
            const name = (p.name || "").toLowerCase();
            const bio = (p.biography || "").toLowerCase();
            return name.includes(q) || bio.includes(q);
        });
    }, [politicians, search]);

    return (
        <>
            <div className="container">
                <h1 className="my-5">Politicians</h1>

                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Cerca per nome o biografia..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="row row-cols-3 g-5">
                    {filteredPoliticians.map((politician) => {
                        return (
                            <div
                                className="col"
                                key={politician.id || politician.name}
                            >
                                <Card politician={politician} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
