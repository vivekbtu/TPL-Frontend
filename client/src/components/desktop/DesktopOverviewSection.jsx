import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import OverviewCard from "./OverviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getOverview } from "../../redux/overview/overview.action";

export default function DesktopOverviewSection() {
  let { overviewData, loading, error } = useSelector(
    (store) => store.overviewData
  );
  let { data } = useSelector((store) => store.auth);
  let disptach = useDispatch();
// data fir overview 
  useEffect(() => {
    disptach(getOverview(data));
  }, []);
  return (
    <Box
      w="95%"
      position="absolute"
      top={"130px"}
      left="40px"      
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"2%"}
    >
      <OverviewCard title="Total Projects" count={overviewData.totalCount} loading={loading} error={error}/>
      <OverviewCard title="Closed" count={overviewData.closedCount} loading={loading} error={error}/>
      <OverviewCard title="Running" count={overviewData.runningCount} loading={loading} error={error}/>
      <OverviewCard title="Closure Delay" count={overviewData.delayedCount} loading={loading} error={error}/>
      <OverviewCard title="Cancelled" count={overviewData.cancelledCount} loading={loading} error={error}/>
    </Box>
  );
}
