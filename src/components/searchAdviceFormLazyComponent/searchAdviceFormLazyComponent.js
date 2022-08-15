import { useState } from "react";
import ApiService from "../../services/api.service";
import Loader from "../loader/loader";
import { Keyboard, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./searchAdviceFormLazyComponent.scss";

const SearchAdviceFormLazyComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [foundAdvices, setFoundAdvices] = useState([]);
    const [isSearched, setIsSearched] = useState(true);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        setIsSearched(false);
        setTimeout(() => {
            ApiService.getData(`https://api.adviceslip.com/advice/search/${searchQuery}`).then(
                (data) => {
                    data.message ? setMessage(data.message.text) : setMessage("");
                    data.slips ? setFoundAdvices(data.slips) : setFoundAdvices([]);

                    setIsSearched(true);
                }
            );
        }, 1000);

        e.preventDefault();
    };

    return (
        <div>
            <form id="search-form">
                <input
                    type="search"
                    id="search-query"
                    placeholder="Type a word..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.currentTarget.value);
                    }}
                />
                <button id="search-button" type="submit" onClick={handleSubmit}>
                    Search
                </button>
            </form>

            {isSearched ? (
                <>
                    {message && <p>{message} </p>}
                    <div className="swiperContainer">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            keyboard={{
                                enabled: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Keyboard, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {foundAdvices &&
                                foundAdvices.map(({ id, advice }) => (
                                    <SwiperSlide key={id}>
                                        <p>{advice}</p>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default SearchAdviceFormLazyComponent;
