import {Instrument} from "../../Interfaces";

export function getAllInstruments(): Promise<Instrument[] | string> {
    return new Promise((resolve: (list: Instrument[]) => void, reject: (error: string) => void) => {
        fetch("/api/instruments")
            .then((r: Response) => {
                if (r.status === 404) {
                    resolve([]);
                    return;
                }
                if (r.status !== 200) {
                    throw r.status + " - " + r.statusText;
                }
                r.json()
                    .then((json: Instrument[]) => {
                        if (!Array.isArray(json)) {
                            throw "Json response is not a list";
                        }
                        console.log("Retrieved instrument list, " + json.length + " items/s");
                        console.log(json);
                        resolve(json);

                        // If the list is empty then show this message in the list
                    })
                    .catch((error) => {
                        console.error("Unable to read json from response, error: " + error);
                        reject("Unable to load questionnaires");
                    });
            }).catch((error) => {
                console.error("Failed to retrieve instrument list, error: " + error);
                reject("Unable to load questionnaires");
            }
        );
    });
}
