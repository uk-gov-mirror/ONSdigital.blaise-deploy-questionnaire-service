import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Instrument} from "../../Interfaces";
import dateFormatter from "dayjs";

interface Props {
    list: Instrument[],
    listError: string | null
    listIsLoading: boolean
}

function InstrumentList({list, listError, listIsLoading}: Props): ReactElement {
    list.sort((a: Instrument, b: Instrument) => Date.parse(b.installDate) - Date.parse(a.installDate));

    function table() {
        if (listError) {
            return tablePanel(listError);
        } else if (listIsLoading) {
            return tablePanel("Loading ...");
        } else if (list.length === 0) {
            return tablePanel("No installed questionnaires found.");
        } else {
            return instrumentTable();
        }
    }


    return (
        <>
            <h2 className="u-mt-m">Table of questionnaires</h2>
            {table()}
        </>
    );


    function tablePanel(message: string): ReactElement {
        return (
            <div className={`panel panel--${listError ? "error" : "info"} panel--no-title u-mb-m`}>
                <div className="panel__body">
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        );
    }


    function instrumentTable(): ReactElement {
        return <table id="instrument-table" className="table ">
            <thead className="table__head u-mt-m">
            <tr className="table__row">
                <th scope="col" className="table__header ">
                    <span>Questionnaire</span>
                </th>
                <th scope="col" className="table__header ">
                    <span>Field period</span>
                </th>
                <th scope="col" className="table__header ">
                    <span>Install date</span>
                </th>
                <th scope="col" className="table__header ">
                    <span>Cases</span>
                </th>
                <th scope="col" className="table__header ">
                    <span>Delete questionnaire</span>
                </th>
            </tr>
            </thead>
            <tbody className="table__body">
            {
                list.map((item: Instrument) => {
                    return (
                        <tr className="table__row" key={item.name} data-testid={"instrument-table-row"}>
                            <td className="table__cell ">
                                {item.name}
                            </td>
                            <td className="table__cell ">
                                {item.fieldPeriod}
                            </td>
                            <td className="table__cell ">
                                {dateFormatter(item.installDate).format("DD/MM/YYYY HH:mm")}
                            </td>
                            <td className="table__cell ">
                                {item.dataRecordCount}
                            </td>
                            <td className={"table__cell "} id={`delete-${item.name}`}>
                                {
                                    item.active ?
                                        "Questionnaire is live"
                                        :
                                        <Link id={`delete-button-${item.name}`}
                                              data-testid={`delete-${item.name}`}
                                              to={{
                                                  pathname: "/delete",
                                                  state: {instrumentName: item.name}
                                              }}>
                                            Delete
                                        </Link>
                                }
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>;
    }
}

export default InstrumentList;
