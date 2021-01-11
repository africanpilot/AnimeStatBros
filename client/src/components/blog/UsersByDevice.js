import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: "pie",
      data: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: this.props.data,
            backgroundColor: this.props.backgroundColor
          }
        ],
        labels: this.props.labels
      },
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h3 className="m-0">{title}</h3>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height={this.props.canvasHeight}
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  // chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Users by device",
  chartData: [],
  canvasHeight: 270,
};

export default UsersByDevice;