import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./radio.jpg";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from './113171-music-green.json'

export default function Radio() {

    const [stations, setStations] = useState();
    const [stationFilter, setStationFilter] = useState("all");

    useEffect(() => {
        setupApi(stationFilter).then((data) => {
            console.log(data);
            setStations(data);
        });
    }, [stationFilter]);

    const setupApi = async (stationFilter) => {
        const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

        const stations = await api
            .searchStations({
                language: "english",
                tag: stationFilter,
                limit: 40,
            })
            .then((data) => {
                return data;
            });

        return stations;
    };

    const filters = [
        "all",
        "classical",
        "country",
        "dance",
        "disco",
        "house",
        "jazz",
        "pop",
        "rap",
        "retro",
        "rock",
    ];

    const setDefaultSrc = (event) => {
        event.target.src = defaultImage;
    };

    return (
        <div className="radio">
            <div className="filters">
                <Player
                    autoplay
                    loop
                    src={animation}
                    style={{ height: '100px', width: '300px' }}
                >
                </Player>
                {filters.map((filter, index) => (
                    <span
                        key={index}
                        className={stationFilter === filter ? "selected" : ""}
                        onClick={() => setStationFilter(filter)}
                    >
                        {filter}
                    </span>
                ))}
                <Player
                    autoplay
                    loop
                    src={animation}
                    style={{ height: '100px', width: '300px' }}
                >
                </Player>
            </div>
            <div className="stations">
                {stations &&
                    stations.map((station, index) => {
                        return (
                            <div className="station" key={index}>
                                <div className="stationName">
                                    <img
                                        className="logo"
                                        src={station.favicon}
                                        alt="station logo"
                                        onError={setDefaultSrc}
                                    />
                                    <div className="name">{station.name}</div>
                                </div>

                                <AudioPlayer
                                    className="player"
                                    src={station.urlResolved}
                                    showJumpControls={false}
                                    layout="stacked"
                                    customProgressBarSection={[]}
                                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                                    autoPlayAfterSrcChange={false}
                                />
                            </div>
                        );
                    })}
            </div>
            <div className="footer">
                <p> Copyrights 2022, Developed by <span>Guillaume SERE </span>with React</p>
            </div>
        </div>
    );
}