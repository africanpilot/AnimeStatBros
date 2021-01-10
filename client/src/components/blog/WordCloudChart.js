import React from "react";
import ReactWordcloud from "react-wordcloud";
import {Row,Col
} from "shards-react";
import WordCloudTable from "../../components/blog/WordCloudTable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import words from "../../data/words";

export default function WordCloudChart() {
  return (
    <Row>
      <Col lg="4" md="12" sm="12" className="mb-4">
        <ReactWordcloud words={words} />
      </Col>
      <Col>
        <WordCloudTable lg="4" md="12" sm="12" className="mb-4"/>
      </Col>
    </Row>
  );
}