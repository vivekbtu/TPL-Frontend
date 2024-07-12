import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { getOverview } from "../../redux/overview/overview.action";
import { Box } from "@chakra-ui/react";
import MobileOverviewCard from "./MobileOverviewCard";
import "swiper/css";
import "swiper/css/pagination";

export default function MobileOverview() {
  let { overviewData, loading, error } = useSelector(
    (store) => store.overviewData
  );
  let { data } = useSelector((store) => store.auth);
  let disptach = useDispatch();
// data from api
  useEffect(() => {
    disptach(getOverview(data));
  }, []);
  return (
    <Box mt="20px" px="20px">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[]}
        className="mySwiper"
      >
        <SwiperSlide>
          <MobileOverviewCard
            title="Total Projects"
            count={overviewData.totalCount}
            loading={loading}
            error={error}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MobileOverviewCard
            title="Closed"
            count={overviewData.closedCount}
            loading={loading}
            error={error}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MobileOverviewCard
            title="Running"
            count={overviewData.runningCount}
            loading={loading}
            error={error}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MobileOverviewCard
            title="Closure Delay"
            count={overviewData.delayedCount}
            loading={loading}
            error={error}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MobileOverviewCard
            title="Cancelled"
            count={overviewData.cancelledCount}
            loading={loading}
            error={error}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
