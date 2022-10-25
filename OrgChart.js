import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { OrgChart } from 'd3-org-chart';
import './style.css';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .onNodeClick((d, i, arr) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .nodeContent(({ data }) => {
          console.log(data);
          return `
          <div class="data-container">
            <img class="user-img" src=${data.imageUrl} />
            <div class="data-description">
              <span>${data.name}</span>
              <span>${data.area}</span>
            </div>
          </div>`;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div className="org-chart-container">
      <div ref={d3Container} />
    </div>
  );
};
