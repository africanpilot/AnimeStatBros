import React from "react";
import PropTypes from "prop-types";
import {Row,Col} from "shards-react";
import "../../assets/trendlist.css";
import AnimeStatsTrendList from "../../components/common/AnimeStatsTrendList";

const TopAnimeTrendsSmallStats = ({ smallStats}) => (
  <div>
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="col-lg" key={idx} {...stats.attrs}>
          <AnimeStatsTrendList
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
            backgroundImage={stats.backgroundImage}
          />
        </Col>
      ))}
    </Row>
  </div>
);

TopAnimeTrendsSmallStats.propTypes = {
  /**
   * The small stats dataset.
   */
  TopAnimeTrendsSmallStats: PropTypes.array
};

TopAnimeTrendsSmallStats.defaultProps = {
  title: "Top Anime Trends",
  smallStats: [
    {
      label: "Boku no Hero Academia",
      value: "8.9",
      percentage: "80%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/myhero.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Nartuo",
      value: "9.3",
      percentage: "70%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/naruto.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Afro Samuri",
      value: "8.7",
      percentage: "50%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/afrosamuri.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "One Punch Man",
      value: "9.7",
      percentage: "60%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/onepunchman.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "Boku no Hero Academia",
      value: "8.9",
      percentage: "80%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/myhero.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Nartuo",
      value: "9.3",
      percentage: "70%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/naruto.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Afro Samuri",
      value: "8.7",
      percentage: "50%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/afrosamuri.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "One Punch Man",
      value: "9.7",
      percentage: "60%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/onepunchman.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "Boku no Hero Academia",
      value: "8.9",
      percentage: "80%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { lg: "4" ,md: "6", sm: "6" },
      backgroundImage: require("../../images/content-management/myhero.jpg"),
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    }
  ]
};

export default TopAnimeTrendsSmallStats;
