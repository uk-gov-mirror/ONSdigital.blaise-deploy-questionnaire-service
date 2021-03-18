import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Instrument} from "../../Interfaces";
import dateFormatter from "dayjs";
import {ONSPanel} from "blaise-design-system-react-components";

interface Props {
    list: Instrument[],
    listError: string
}

function InstrumentList({list, listError}: Props): ReactElement {
    list.sort((a: Instrument, b: Instrument) => Date.parse(b.installDate) - Date.parse(a.installDate));

    return <>
        <h1>
            Table of questionnaires
        </h1>
        <div className="u-mb-l">
            <ONSPanel>
                <p>
                    Any <b>live</b> questionnaire within the table below <b>does not</b> have the
                    option to delete and <b>cannot be deleted</b>.

                    If a <b>live</b> questionnaire requires deletion, raise a Service Desk ticket to
                    complete this request.
                </p>
            </ONSPanel>
        </div>
        <div className="js-adv-filter">
            <div className="grid grid--column@xxs@s u-mb-m@m">
                <div className="grid__col col-4@m">
                    <button type="button"
                            className="btn adv-filter__trigger js-adv-filter__trigger btn btn--secondary btn--small u-mb-m"
                            name="btn-submit" aria-label="Toggle filters" aria-expanded="false"
                            aria-controls="filter-panel">
                        <span className="btn__inner">Show filters</span>
                    </button>
                    <div className="adv-filter__panel js-adv-filter__panel" id="filter-panel">
                        <h2 className="u-fs-l">Filters</h2>
                        <form className="js-adv-filter__form" method="POST">
                            <button className="adv-filter__reset js-adv-filter__reset btn btn--secondary btn--small"
                                    type="reset">
                                <span className="btn__inner">Reset all filters</span></button>

                            <div className="adv-filter__item js-adv-filter__item" data-default-text="All surveys"
                                 data-multi-select-text="{n} filters selected">
                                <fieldset className="fieldset" aria-controls="adv-filter-gallery">
                                    <legend className="fieldset__legend">Surveys</legend>
                                    <div className="adv-filter__selection">
                                        <span className="u-vh">Active filters: </span>
                                        <span className="u-fs-s js-adv-filter__selection">All surveys</span>
                                    </div>
                                    <p className="checkboxes__label"></p>
                                    <div className="checkboxes__items">
                                        <p className="checkboxes__item">
                                  <span className="checkbox checkbox--toggle">
                                    <input type="checkbox" id="opn"
                                           className="checkbox__input js-checkbox " value="opn"
                                           data-filter="opn"/>
                                    <label className="checkbox__label  " htmlFor="opn"
                                           id="opn-label">OPN
                                    </label>
                                  </span>
                                        </p>
                                        <br/>
                                        <p className="checkboxes__item">
                                  <span className="checkbox checkbox--toggle">
                                    <input type="checkbox" id="lms"
                                           className="checkbox__input js-checkbox " value="lms"
                                           data-filter="lms"/>
                                    <label className="checkbox__label  " htmlFor="lms"
                                           id="lms-label">LMS
                                    </label>
                                  </span>
                                        </p>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="adv-filter__item js-adv-filter__item" data-default-text="All types"
                                 data-multi-select-text="{n} filters selected">
                                <fieldset className="fieldset" aria-controls="adv-filter-gallery">
                                    <legend className="fieldset__legend">Questionnaire status</legend>
                                    <div className="adv-filter__selection">
                                        <span className="u-vh">Active filters: </span>
                                        <span className="u-fs-s js-adv-filter__selection">All types</span>
                                    </div>
                                    <p className="checkboxes__label"></p>
                                    <div className="checkboxes__items">
                                        <p className="checkboxes__item">
                                  <span className="checkbox checkbox--toggle">
                                    <input type="checkbox" id="Active" className="checkbox__input js-checkbox "
                                           value="Active" data-filter="Active"/>
                                    <label className="checkbox__label  " htmlFor="Active" id="Active-label">Active
                                    </label>
                                  </span>
                                        </p>
                                        <br/>
                                        <p className="checkboxes__item">
                                  <span className="checkbox checkbox--toggle">
                                    <input type="checkbox" id="Erroneous" className="checkbox__input js-checkbox "
                                           value="Erroneous" data-filter="Erroneous"/>
                                    <label className="checkbox__label  " htmlFor="Erroneous" id="Erroneous-label">Erroneous
                                    </label>
                                  </span>
                                        </p>
                                    </div>
                                </fieldset>
                            </div>


                            <div className="adv-filter__actions">
                                <button type="button" className="btn btn btn--small js-adv-filter__show"
                                        name="btn-submit">
                                    <span className="btn__inner">Show (<span
                                        className="js-adv-filter__show-results">7</span> results)</span>
                                </button>
                                <button type="button" className="btn btn--small btn--secondary js-adv-filter__close"
                                        name="btn-submit">
                                    <span className="btn__inner">Close</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="grid__col col-8@m">
                    <div className="adv-filter__results-options">
                        <div className="adv-filter__results-count">
                            <span className="js-adv-filter__results-count">{list.length}</span> results of {list.length}
                        </div>
                        <div className="adv-filter__results-sort">
                            <label className="label" htmlFor="sort">Sort by</label>
                            <select className="input input--select" id="sort" name="sort"
                                    aria-controls="adv-filter-gallery" data-sort="true">
                                <option value="index" data-sort-number="true">Latest installed</option>
                                <option value="index" data-sort-order="desc" data-sort-number="true">Oldest installed
                                </option>
                            </select>
                        </div>
                    </div>
                    <ul className="adv-filter__gallery js-adv-filter__gallery" id="adv-filter-gallery"
                        data-filter-animation="off">
                        {
                            list.map((item: Instrument, index) => {
                                return (
                                    <li key={item.name}
                                        className="filter__item js-filter__item"
                                        data-filter={`opn ${item.status}`}
                                        data-sort-index={index}>
                                        <div className="download__content">
                                            <h2 className="u-fs-m u-mt-no u-mb-xs">{item.name}</h2>
                                            <dl className="metadata metadata__list grid grid--gutterless u-cf u-mb-l"
                                                title="This is an example of the metadata component"
                                                aria-label="This is an example of the metadata component">
                                                <dt className="metadata__term grid__col col-4@m">Field Period:</dt>
                                                <dd className="metadata__value grid__col col-8@m">{item.fieldPeriod}</dd>
                                                <dt className="metadata__term grid__col col-4@m">Status:</dt>
                                                <dd className="metadata__value grid__col col-8@m">{item.status}</dd>
                                                <dt className="metadata__term grid__col col-4@m">Installed date:</dt>
                                                <dd className="metadata__value grid__col col-8@m">{dateFormatter(item.installDate).format("DD/MM/YYYY HH:mm")}
                                                </dd>
                                                <dt className="metadata__term grid__col col-4@m">Number of cases:</dt>
                                                <dd className="metadata__value grid__col col-8@m">{item.dataRecordCount}</dd>

                                            </dl>
                                            <p id={`delete-${item.name}`}>
                                                {
                                                    item.active ?
                                                        "Questionnaire is live"
                                                        :
                                                        <Link id={`delete-button-${item.name}`}
                                                              data-testid={`delete-${item.name}`} to={{
                                                            pathname: "/delete",
                                                            state: {instrumentName: item.name}
                                                        }}>
                                                            Delete {item.name}
                                                        </Link>
                                                }
                                            </p>
                                        </div>
                                    </li>
                                );
                            })
                        }


                        {/*<li className="filter__item js-filter__item"*/}
                        {/*    data-filter="poster english local-authorities community-groups recruitment"*/}
                        {/*    data-sort-index="1">*/}


                        {/*    <div className="download">*/}
                        {/*        <div className="download__image" aria-hidden="true">*/}
                        {/*            <a className="download__image-link"*/}
                        {/*               href="/patternlib-img/download-resources/documents/Print-Ready-A4GIP1-2021-v1-0-120620.pdf"*/}
                        {/*            >*/}
                        {/*                <img*/}
                        {/*                    srcSet="/patternlib-img/download-resources/img/small/census-2021-matters-to-everyone.png 1x, /patternlib-img/download-resources/img/large/census-2021-matters-to-everyone.png 2x"*/}
                        {/*                    src="/patternlib-img/download-resources/img/small/census-2021-matters-to-everyone.png"*/}
                        {/*                    alt="" loading="lazy"/>*/}
                        {/*            </a>*/}
                        {/*        </div>*/}
                        {/*        <div className="download__content">*/}
                        {/*            <h3 className="u-fs-m u-mt-no u-mb-xs">*/}
                        {/*                <a href="/patternlib-img/download-resources/documents/Print-Ready-A4GIP1-2021-v1-0-120620.pdf">Census*/}
                        {/*                    2021 matters to everyone<span className="u-vh">,*/}
                        {/*    PDF document download, 866KB, 1 page*/}
                        {/*    </span></a>*/}
                        {/*            </h3>*/}
                        {/*            <span className="u-fs-s u-mb-xs download__meta" aria-hidden="true">*/}
                        {/*    Poster,*/}
                        {/*    PDF, 866KB, 1 page*/}
                        {/*    </span>*/}
                        {/*            <p className="download__excerpt">By taking part and encouraging others to do the*/}
                        {/*                same, you’ll make sure your community gets the services it needs.</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="adv-filter__no-results" data-fallback-gallery-id="adv-filter-gallery">
                        <h2>
                            {
                                (list.length > 0 ? "No results found" : listError)
                            }
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default InstrumentList;
