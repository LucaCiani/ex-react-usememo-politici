import { useEffect, useState } from "react";

function App() {
    const [politicians, setPoliticians] = useState([]);
    const loadPoliticians = async () => {
        const res = await fetch("http://localhost:3333/politicians");
        const data = await res.json();
        setPoliticians(data);
    };

    useEffect(() => {
        loadPoliticians();
    }, []);

    console.log(politicians);

    return (
        <>
            <div className="container">
                <h1 className="my-5">Politicians</h1>
                <div className="row row-cols-3 g-5">
                    {politicians.map((politician) => {
                        return (
                            <div className="col">
                                <div className="card h-100">
                                    <img
                                        src={politician.image}
                                        className="card-img-top"
                                        alt=""
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            {politician.name}
                                        </h3>
                                        <p className="card-text">
                                            {politician.position}
                                        </p>
                                        <p className="card-text">
                                            {politician.biography}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
